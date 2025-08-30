<?php

use App\Http\Controllers\Api\ProjectIdeaController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// ? Project Ideas API routes
Route::post('generate-ideas', [ProjectIdeaController::class, 'generate']);
Route::get('options', [ProjectIdeaController::class, 'options']);

// ? Auths
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

   Route::post('/logout', [AuthController::class, 'logout']);
});