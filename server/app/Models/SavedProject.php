<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Log;

class SavedProject extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'features',
        'estimated_time',
        'learning_outcomes',
        'difficulty',
        'tech_stack',
        'is_public',
        'aura_count'
    ];

    protected $casts = [
        'features' => 'array',
        'learning_outcomes' => 'array',
        'tech_stack' => 'array',
        'is_public' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function auras(): HasMany
    {
        return $this->hasMany(ProjectAura::class);
    }

    public function auraUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_auras', 'saved_project_id', 'user_id')
                    ->withTimestamps();
    }

    public function hasAuraFrom(User $user): bool
    {
        try {
            return $this->auras()->where('user_id', $user->id)->exists();
        } catch (\Exception $e) {
            // Log error and return false as fallback
            Log::warning('Error checking aura status for project ' . $this->id . ' and user ' . $user->id . ': ' . $e->getMessage());
            return false;
        }
    }
}
