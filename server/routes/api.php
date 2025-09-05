<?php

use App\Http\Controllers\Api\ProjectIdeaController;
use App\Http\Controllers\Api\SavedProjectController;
use App\Http\Controllers\Api\ProjectAuraController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\OAuthController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// ? Project Ideas API routes
Route::post('generate-ideas', [ProjectIdeaController::class, 'generate'])->middleware('timeout:90');
Route::get('options', [ProjectIdeaController::class, 'options']);

// ? Site statistics
Route::get('stats', [StatsController::class, 'index']);

// ? Public saved projects (optionally authenticated for aura status)
Route::get('projects', [SavedProjectController::class, 'index'])->middleware('optional.auth');
Route::get('projects/{savedProject}', [SavedProjectController::class, 'show']);
Route::get('projects/{savedProject}/aura', [ProjectAuraController::class, 'status']);

// ? Auths
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ? OAuth routes (using web middleware for session support)
Route::middleware('web')->group(function () {
    Route::get('/auth/github/url', [OAuthController::class, 'getGitHubAuthUrl']);
    Route::get('/auth/github/redirect', [OAuthController::class, 'redirectToGitHub']);
    Route::get('/auth/github/callback', [OAuthController::class, 'handleGitHubCallback']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    
    // ? Aura functionality (protected)
    Route::post('/projects/{savedProject}/aura', [ProjectAuraController::class, 'toggle']);
    
    // ? Protected saved projects routes
    Route::get('/my-projects', [SavedProjectController::class, 'myProjects']);
    Route::post('/projects', [SavedProjectController::class, 'store']);
    Route::put('/projects/{savedProject}', [SavedProjectController::class, 'update']);
    Route::delete('/projects/{savedProject}', [SavedProjectController::class, 'destroy']);
});