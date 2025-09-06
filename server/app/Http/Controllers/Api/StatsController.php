<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedProject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StatsController extends Controller
{
    /**
     * Get site statistics
     */
    public function index()
    {
        try {
            $stats = [
                'total_projects' => SavedProject::count(),
                'total_users' => User::count(),
                'total_auras' => SavedProject::sum('aura_count'),
                'public_projects' => SavedProject::where('is_public', true)->count(),
                'top_technologies' => $this->getTopTechnologies(),
                'projects_this_week' => SavedProject::where('created_at', '>=', now()->subWeek())->count(),
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch statistics',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the most popular technologies
     */
    private function getTopTechnologies()
    {
        try {
            // Get all tech stacks from saved projects and count them
            $allTechs = SavedProject::whereNotNull('tech_stack')
                ->where('tech_stack', '!=', '[]') // Exclude empty arrays
                ->pluck('tech_stack')
                ->map(function ($techStack) {
                    // Handle both string and array formats
                    if (is_string($techStack)) {
                        $decoded = json_decode($techStack, true);
                        return is_array($decoded) ? $decoded : [];
                    }
                    return is_array($techStack) ? $techStack : [];
                })
                ->filter(function ($techArray) {
                    return !empty($techArray); // Remove empty arrays
                })
                ->flatten() // Flatten all tech arrays into single collection
                ->map(function ($tech) {
                    return trim(strtolower($tech)); // Normalize tech names
                })
                ->filter(function ($tech) {
                    return !empty($tech); // Remove empty strings
                })
                ->countBy() // Count occurrences
                ->sortDesc() // Sort by count descending
                ->take(5); // Take top 5

            return $allTechs->map(function ($count, $tech) {
                return [
                    'name' => ucfirst($tech), // Capitalize first letter
                    'count' => $count
                ];
            })->values()->toArray();
        } catch (\Exception $e) {
            Log::error('Error in getTopTechnologies: ' . $e->getMessage());
            return [];
        }
    }
}
