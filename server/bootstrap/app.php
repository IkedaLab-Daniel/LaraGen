<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [

        ]);

        $middleware->api(append: [
            EnsureFrontendRequestsAreStateful::class,
        ]);

        // Register custom middleware aliases
        $middleware->alias([
            'timeout' => \App\Http\Middleware\SetExecutionTimeLimit::class,
            'optional.auth' => \App\Http\Middleware\OptionalAuth::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
