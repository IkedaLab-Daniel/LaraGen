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
            // Debug: Let's see what we're working with
            $totalProjects = SavedProject::count();
            $projectsWithTechStack = SavedProject::whereNotNull('tech_stack')->count();
            
            Log::info("Debug getTopTechnologies - Total projects: {$totalProjects}, Projects with tech_stack: {$projectsWithTechStack}");
            
            // Get a sample of raw tech_stack data
            $sampleData = SavedProject::whereNotNull('tech_stack')
                ->limit(3)
                ->get(['tech_stack']);
            
            Log::info('Sample tech_stack data:', $sampleData->toArray());
            
            // Get all tech stacks from saved projects and count them
            $allTechs = SavedProject::whereNotNull('tech_stack')
                ->get()
                ->pluck('tech_stack')
                ->filter(function ($techStack) {
                    // Since tech_stack is cast as array, it will already be an array
                    $isValid = is_array($techStack) && !empty($techStack);
                    Log::info('Filtering tech_stack:', ['techStack' => $techStack, 'is_valid' => $isValid]);
                    return $isValid;
                })
                ->flatten() // Flatten all tech arrays into single collection
                ->map(function ($tech) {
                    $normalized = trim(strtolower($tech));
                    Log::info('Normalized tech:', ['original' => $tech, 'normalized' => $normalized]);
                    return $normalized;
                })
                ->filter(function ($tech) {
                    return !empty($tech); // Remove empty strings
                })
                ->countBy() // Count occurrences
                ->sortDesc() // Sort by count descending
                ->take(5); // Take top 5

            Log::info('Final tech counts:', $allTechs->toArray());

            return $allTechs->map(function ($count, $tech) {
                return [
                    'name' => ucfirst($tech), // Capitalize first letter
                    'count' => $count
                ];
            })->values()->toArray();
        } catch (\Exception $e) {
            Log::error('Error in getTopTechnologies: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return [];
        }
    }
}
