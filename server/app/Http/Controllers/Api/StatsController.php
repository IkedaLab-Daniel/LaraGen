<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedProject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            // Get all technologies from saved projects and count them
            $allTechs = SavedProject::whereNotNull('technologies')
                ->pluck('technologies')
                ->map(function ($tech) {
                    return is_string($tech) ? json_decode($tech, true) : $tech;
                })
                ->filter()
                ->flatten()
                ->countBy()
                ->sortDesc()
                ->take(5);

            return $allTechs->toArray();
        } catch (\Exception $e) {
            return [];
        }
    }
}
