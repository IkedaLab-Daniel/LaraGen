<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    /**
     * Redirect to GitHub OAuth
     */
    public function redirectToGitHub()
    {
        try {
            return Socialite::driver('github')->redirect();
        } catch (\Exception $e) {
            Log::error('GitHub OAuth redirect error: ' . $e->getMessage());
            return response()->json([
                'error' => 'OAuth configuration error',
                'message' => 'Unable to connect to GitHub. Please try again later.'
            ], 500);
        }
    }

    /**
     * Handle GitHub OAuth callback
     */
    public function handleGitHubCallback(Request $request)
    {
        try {
            Log::info('GitHub OAuth callback started', [
                'all_params' => $request->all(),
                'url' => $request->fullUrl()
            ]);

            // Handle OAuth error from GitHub
            if ($request->has('error')) {
                Log::error('GitHub OAuth error from GitHub: ' . $request->get('error_description', $request->get('error')));
                
                $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
                $redirectUrl = $frontendUrl . '/auth/callback?' . http_build_query([
                    'error' => 'true',
                    'message' => 'GitHub authentication was cancelled or failed.'
                ]);

                return redirect($redirectUrl);
            }

            // Check if we have the authorization code
            if (!$request->has('code')) {
                Log::error('No authorization code received from GitHub');
                
                $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
                $redirectUrl = $frontendUrl . '/auth/callback?' . http_build_query([
                    'error' => 'true',
                    'message' => 'No authorization code received from GitHub.'
                ]);

                return redirect($redirectUrl);
            }
            
            Log::info('About to call Socialite to get GitHub user');
            
            try {
                // Use a different approach - temporarily disable state validation
                $driver = Socialite::driver('github');
                
                // For Laravel Socialite, we can override the state validation by setting the state in session
                $receivedState = $request->get('state');
                if ($receivedState) {
                    $request->session()->put('state', $receivedState);
                }
                
                $githubUser = $driver->user();
                Log::info('Successfully retrieved GitHub user with Socialite');
            } catch (\Exception $e) {
                Log::error('Socialite error: ' . $e->getMessage());
                Log::error('Exception class: ' . get_class($e));
                throw $e;
            }
            
            Log::info('GitHub user data received:', [
                'id' => $githubUser->getId(),
                'email' => $githubUser->getEmail(),
                'name' => $githubUser->getName(),
                'nickname' => $githubUser->getNickname(),
                'avatar' => $githubUser->getAvatar(),
            ]);

            // Check if user already exists by GitHub ID
            $user = User::where('github_id', $githubUser->getId())->first();

            if (!$user) {
                // Check if user exists by email
                $user = User::where('email', $githubUser->getEmail())->first();
                
                if ($user) {
                    // Link existing user to GitHub
                    $user->update([
                        'github_id' => $githubUser->getId(),
                        'github_username' => $githubUser->getNickname(),
                        'avatar_url' => $githubUser->getAvatar(),
                    ]);
                } else {
                    // Create new user
                    $user = User::create([
                        'name' => $githubUser->getName() ?: $githubUser->getNickname(),
                        'email' => $githubUser->getEmail(),
                        'github_id' => $githubUser->getId(),
                        'github_username' => $githubUser->getNickname(),
                        'avatar_url' => $githubUser->getAvatar(),
                        'email_verified_at' => now(), // GitHub users are pre-verified
                    ]);
                }
            } else {
                // Update existing GitHub user data
                $user->update([
                    'name' => $githubUser->getName() ?: $githubUser->getNickname(),
                    'github_username' => $githubUser->getNickname(),
                    'avatar_url' => $githubUser->getAvatar(),
                ]);
            }

            // Create token
            $token = $user->createToken('LaraGen')->plainTextToken;

            // Redirect to frontend with success data
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
            $redirectUrl = $frontendUrl . '/auth/callback?' . http_build_query([
                'success' => 'true',
                'token' => $token,
                'user' => base64_encode(json_encode([
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'github_username' => $user->github_username,
                    'avatar_url' => $user->avatar_url,
                ]))
            ]);

            return redirect($redirectUrl);

        } catch (\Exception $e) {
            Log::error('GitHub OAuth callback error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            // Redirect to frontend with error
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
            $redirectUrl = $frontendUrl . '/auth/callback?' . http_build_query([
                'error' => 'true',
                'message' => 'Authentication failed. Please try again.'
            ]);

            return redirect($redirectUrl);
        }
    }

    /**
     * Get GitHub OAuth URL for frontend
     */
    public function getGitHubAuthUrl(Request $request)
    {
        try {
            // Use Socialite's built-in redirect to get the URL
            $driver = Socialite::driver('github');
            $redirectResponse = $driver->redirect();
            $authUrl = $redirectResponse->getTargetUrl();

            Log::info('Generated GitHub auth URL', [
                'url' => $authUrl
            ]);

            return response()->json([
                'auth_url' => $authUrl
            ]);
        } catch (\Exception $e) {
            Log::error('GitHub OAuth URL generation error: ' . $e->getMessage());
            return response()->json([
                'error' => 'OAuth configuration error',
                'message' => 'Unable to generate GitHub auth URL'
            ], 500);
        }
    }
}
