<?php

use App\Http\Controllers\Api\ProjectIdeaController;
use Illuminate\Support\Facades\Route;


// ? Project Ideas API routes
Route::post('generate-ideas', [ProjectIdeaController::class, 'generate']);
Route::get('options', [ProjectIdeaController::class, 'options']);