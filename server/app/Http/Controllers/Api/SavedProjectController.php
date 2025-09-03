<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedProject;
use App\Models\ProjectAura;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SavedProjectController extends Controller
{
    /**
     * Get all public projects for gallery
     */
    public function index(Request $request): JsonResponse
    {
        $projects = SavedProject::with('user:id,name')
            ->where('is_public', true)
            ->orderByDesc('aura_count')
            ->latest()
            ->paginate(12);

        // Add aura status for authenticated users
        if ($request->user()) {
            $projects->getCollection()->transform(function ($project) use ($request) {
                $project->has_aura = $project->hasAuraFrom($request->user());
                return $project;
            });
        }

        return response()->json([
            'success' => true,
            'data' => $projects,
            'message' => 'Public projects retrieved successfully'
        ]);
    }

    /**
     * Get current user's saved projects
     */
    public function myProjects(Request $request): JsonResponse
    {
        $projects = $request->user()->savedProjects()
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
            'message' => 'Your saved projects retrieved successfully'
        ]);
    }

    /**
     * Save a new project
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'required|array|min:1',
            'features.*' => 'required|string',
            'estimated_time' => 'required|string',
            'learning_outcomes' => 'required|array|min:1',
            'learning_outcomes.*' => 'required|string',
            'difficulty' => 'required|string|in:beginner,intermediate,advanced',
            'tech_stack' => 'required|array|min:1',
            'tech_stack.*' => 'required|string',
            'is_public' => 'boolean'
        ]);

        $project = $request->user()->savedProjects()->create($validated);

        return response()->json([
            'success' => true,
            'data' => $project,
            'message' => 'Project saved successfully'
        ], 201);
    }

    /**
     * Show a specific project
     */
    public function show(SavedProject $savedProject): JsonResponse
    {
        // Load user relationship
        $savedProject->load('user:id,name');

        // Check if user can view this project
        if (!$savedProject->is_public && $savedProject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'This project is private'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $savedProject,
            'message' => 'Project retrieved successfully'
        ]);
    }

    /**
     * Update a project (only owner can update)
     */
    public function update(Request $request, SavedProject $savedProject): JsonResponse
    {
        // Check ownership
        if ($savedProject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You can only update your own projects'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'features' => 'sometimes|array|min:1',
            'features.*' => 'required_with:features|string',
            'estimated_time' => 'sometimes|string',
            'learning_outcomes' => 'sometimes|array|min:1',
            'learning_outcomes.*' => 'required_with:learning_outcomes|string',
            'difficulty' => 'sometimes|string|in:beginner,intermediate,advanced',
            'tech_stack' => 'sometimes|array|min:1',
            'tech_stack.*' => 'required_with:tech_stack|string',
            'is_public' => 'sometimes|boolean'
        ]);

        $savedProject->update($validated);

        return response()->json([
            'success' => true,
            'data' => $savedProject->fresh(),
            'message' => 'Project updated successfully'
        ]);
    }

    /**
     * Delete a project (only owner can delete)
     */
    public function destroy(SavedProject $savedProject): JsonResponse
    {
        // Check ownership
        if ($savedProject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You can only delete your own projects'
            ], 403);
        }

        $savedProject->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}
