<?php

namespace App\Http\Controllers;

use App\Services\AIService;
use Illuminate\Http\Request;

class ProjectIdeaController extends Controller
{
    public function generate(Request $request)
    {
        // ? validate payload first
        $request->validate([
            'techs'=>'required|array',
            'difficulty'=>'required|string'
        ]);

        // ? get payload
        $techs = $request->input('techs');
        $difficulty = $request->input('difficulty');

        // ? Generate Idea
        // ? store response on $idea
        $idea = AIService::generateProjectIdea($techs, $difficulty);

        return response()->json($idea);
    }
}
