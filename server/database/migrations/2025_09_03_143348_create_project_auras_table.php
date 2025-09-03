<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_auras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('saved_project_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Ensure a user can only give aura once per project
            $table->unique(['user_id', 'saved_project_id']);
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('saved_project_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_auras');
    }
};
