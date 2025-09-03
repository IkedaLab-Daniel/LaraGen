<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectAura extends Model
{
    protected $fillable = [
        'user_id',
        'saved_project_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function savedProject(): BelongsTo
    {
        return $this->belongsTo(SavedProject::class);
    }
}
