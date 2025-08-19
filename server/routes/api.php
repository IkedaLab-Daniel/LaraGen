<?php

use App\Http\Controllers\ProjectIdeaController;
use Illuminate\Support\Facades\Route;

Route::post('/generate-project', [ProjectIdeaController::class, 'generate']);

