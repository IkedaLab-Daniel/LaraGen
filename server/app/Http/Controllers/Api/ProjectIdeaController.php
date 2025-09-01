<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenerateProjectIdeasRequest;
use App\Services\OpenRouterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectIdeaController extends Controller
{
    private OpenRouterService $openRouterService;

    public function __construct(OpenRouterService $openRouterService)
    {
        $this->openRouterService = $openRouterService;
    }

    /**
     * ? Generate project ideas
     */

    public function generate(GenerateProjectIdeasRequest $request): JsonResponse
    {
        // ? validate payload first
        $validated = $request->validate([
            'techs' => 'required|array|min:1',
            'techs.*' => 'required|string|max:50',
            'difficulty' => 'required|string|in:beginner,intermediate,advanced'
        ]);

        try{
            // ? generate project ideas using OpenRouter
            $projectIdeas = $this->openRouterService->generateProjectIdeas(
                $validated['techs'],
                $validated['difficulty']
            );

            $response = [
                'success' => 'true',
                'data' => [
                    'projects' => $projectIdeas,
                    'requested_techs' => $validated['techs'],
                    'request_difficulty' => $validated['difficulty']
                ],
                'message' => 'Project idea generated successfully'
            ];

            // Add fallback information if applicable
            if (isset($projectIdeas['isFallback']) && $projectIdeas['isFallback']) {
                $response['data']['is_fallback'] = true;
                $response['data']['fallback_reason'] = $projectIdeas['fallbackReason'] ?? 'Unknown reason';
                $response['message'] = 'Project ideas generated using fallback (API issue detected)';
            }

            return response()->json($response);

        } catch (\Exception $e){
            return response()->json([
                'success' => 'false',
                'message' => 'Failed to generate project idea',
                'error' => app()->environment('local') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * ? Get available technologies and dofficulty levels
     */
    public function options(): JsonResponse
    {
        return response()->json([
            'success' => 'true',
            'data' => [
                'available_techs' => [
                    'frontend' => ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js'],
                    'backend' => ['Laravel', 'Node.js', 'Express.js', 'Django', 'FastAPI', 'Spring Boot'],
                    'database' => ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis'],
                    'mobile' => ['React Native', 'Flutter', 'Ionic', 'Swift', 'Kotlin'],
                    'other' => ['TypeScript', 'GraphQL', 'Docker', 'AWS', 'Firebase', 'Tailwind CSS']
                ],
                'difficulty_levels' => [
                    'beginner' => 'New to programming or learning fundamentals',
                    'intermediate' => 'Comfortable with basics, ready for more complex challenge',
                    'advanced' => 'Experienced developer looking for challenging projects'
                ]
            ],
            'message' => 'Available options retrieved successfully'
        ]);
    }
}
