<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'is_public'
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
}
