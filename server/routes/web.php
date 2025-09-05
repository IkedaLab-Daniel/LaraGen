<?php

use App\Http\Controllers\Api\OAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// OAuth routes (these need session support, so they go in web routes)
Route::prefix('api')->group(function () {
    Route::get('/auth/github/url', [OAuthController::class, 'getGitHubAuthUrl']);
    Route::get('/auth/github/redirect', [OAuthController::class, 'redirectToGitHub']);
    Route::get('/auth/github/callback', [OAuthController::class, 'handleGitHubCallback']);
});
