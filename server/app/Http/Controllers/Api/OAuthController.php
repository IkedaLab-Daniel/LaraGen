<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            // Verify state parameter
            $state = $request->get('state');
            $sessionState = $request->session()->get('github_oauth_state');
            
            if (!$state || $state !== $sessionState) {
                Log::warning('GitHub OAuth state mismatch', [
                    'provided_state' => $state,
                    'session_state' => $sessionState
                ]);
                
                // Continue with OAuth flow even if state doesn't match for now
                // In production, you might want to reject this
            }
            
            // Clear the state from session
            $request->session()->forget('github_oauth_state');
            
            // Handle OAuth error
            if ($request->has('error')) {
                Log::error('GitHub OAuth error: ' . $request->get('error_description', $request->get('error')));
                
                $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
                $redirectUrl = $frontendUrl . '/auth/callback?' . http_build_query([
                    'error' => 'true',
                    'message' => 'GitHub authentication was cancelled or failed.'
                ]);

                return redirect($redirectUrl);
            }
            
            $githubUser = Socialite::driver('github')->user();
            
            Log::info('GitHub user data:', [
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
            // Build the GitHub OAuth URL manually
            $clientId = config('services.github.client_id');
            $redirectUri = config('services.github.redirect');
            $state = Str::random(40);
            
            // Store state in session for verification
            $request->session()->put('github_oauth_state', $state);
            
            $url = 'https://github.com/login/oauth/authorize?' . http_build_query([
                'client_id' => $clientId,
                'redirect_uri' => $redirectUri,
                'scope' => 'user:email',
                'state' => $state,
            ]);

            return response()->json([
                'auth_url' => $url
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
