<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetExecutionTimeLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, int $timeLimit = 90): Response
    {
        // Set the execution time limit (default 90 seconds = 1 minute 30 seconds)
        set_time_limit($timeLimit);
        
        return $next($request);
    }
}
