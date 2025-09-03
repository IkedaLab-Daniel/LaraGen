<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedProject;
use App\Models\ProjectAura;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectAuraController extends Controller
{
    /**
     * Toggle aura for a project
     */
    public function toggle(Request $request, SavedProject $savedProject): JsonResponse
    {
        try {
            $user = $request->user();
            
            // Check if user already gave aura
            $existingAura = ProjectAura::where('user_id', $user->id)
                                      ->where('saved_project_id', $savedProject->id)
                                      ->first();

            DB::beginTransaction();

            if ($existingAura) {
                // Remove aura
                $existingAura->delete();
                $savedProject->decrement('aura_count');
                $hasAura = false;
                $message = 'Aura removed successfully';
            } else {
                // Add aura
                ProjectAura::create([
                    'user_id' => $user->id,
                    'saved_project_id' => $savedProject->id
                ]);
                $savedProject->increment('aura_count');
                $hasAura = true;
                $message = 'Aura given successfully! ✨';
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => [
                    'aura_count' => $savedProject->fresh()->aura_count,
                    'has_aura' => $hasAura
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle aura',
                'error' => app()->environment('local') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * Get aura status for a project
     */
    public function status(Request $request, SavedProject $savedProject): JsonResponse
    {
        try {
            $user = $request->user();
            
            $hasAura = $user ? $savedProject->hasAuraFrom($user) : false;

            return response()->json([
                'success' => true,
                'data' => [
                    'aura_count' => $savedProject->aura_count,
                    'has_aura' => $hasAura
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get aura status',
                'error' => app()->environment('local') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }
}
