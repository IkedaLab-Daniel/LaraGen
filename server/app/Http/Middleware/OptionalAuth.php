<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class OptionalAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Try to authenticate user if token is provided, but don't fail if not
        if ($request->bearerToken()) {
            try {
                $token = PersonalAccessToken::findToken($request->bearerToken());
                if ($token && $token->tokenable) {
                    Auth::setUser($token->tokenable);
                }
            } catch (\Exception $e) {
                // Silently fail - just continue without authentication
            }
        }

        return $next($request);
    }
}
