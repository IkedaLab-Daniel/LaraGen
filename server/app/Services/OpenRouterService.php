<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService
{
    private string $apiKey;
    private string $apiUrl;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('services.openrouter.api_key');
        $this->apiUrl = config('services.openrouter.api_url');
        $this->model = config('services.openrouter.model');
    }

    public function generateProjectIdeas(array $techs, string $difficulty): array
    {
        $prompt = $this->buildPrompt($techs, $difficulty);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->apiUrl, [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a helpful assistant that generates creative and practical project ideas for developers based on their tech stack and skill level. Always respond with valid JSON containing an array of project ideas.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'max_tokens' => 1500,
                'temperature' => 0.7
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $content = $data['choices'][0]['message']['content'] ?? '';
                
                // Try to extract JSON from the response
                $parsed = $this->parseProjectIdeas($content);
                
                if (empty($parsed)) {
                    // JSON parsing failed, use fallback
                    return [
                        'projects' => $this->getFallbackIdeas($techs, $difficulty),
                        'isFallback' => true,
                        'fallbackReason' => 'API response received but JSON parsing failed. Raw content: ' . substr($content, 0, 200) . '...'
                    ];
                }
                
                return [
                    'projects' => $parsed,
                    'isFallback' => false
                ];
            }

            throw new \Exception("$this->model API request failed with status " . $response->status() . ": " . $response->body());

        } catch (\Exception $e) {
            Log::error('OpenRouter API Error: ' . $e->getMessage());
            
            // Return fallback ideas if API fails
            return [
                'projects' => $this->getFallbackIdeas($techs, $difficulty),
                'isFallback' => true,
                'fallbackReason' => 'API Error: ' . $e->getMessage()
            ];
        }
    }

    private function buildPrompt(array $techs, string $difficulty): string
    {
        $techList = implode(', ', $techs);
        
        return "Generate 3-5 creative project ideas for a {$difficulty} level developer using these technologies: {$techList}. 

For each project, provide:
- name: A catchy project name
- description: Brief description (2-3 sentences)
- features: Array of 3-4 key features
- estimatedTime: Estimated completion time
- learningOutcomes: What the developer will learn

Respond with valid JSON in this exact format:
{
    \"projects\": [
        {
            \"name\": \"Project Name\",
            \"description\": \"Project description here\",
            \"features\": [\"Feature 1\", \"Feature 2\", \"Feature 3\"],
            \"estimatedTime\": \"2-3 weeks\",
            \"learningOutcomes\": [\"Learning 1\", \"Learning 2\"]
        }
    ]
}";
    }

    private function parseProjectIdeas(string $content): array
    {
        // Try to extract JSON from the response
        $jsonStart = strpos($content, '{');
        $jsonEnd = strrpos($content, '}');
        
        if ($jsonStart !== false && $jsonEnd !== false) {
            $jsonString = substr($content, $jsonStart, $jsonEnd - $jsonStart + 1);
            $decoded = json_decode($jsonString, true);
            
            if (json_last_error() === JSON_ERROR_NONE && isset($decoded['projects'])) {
                return $decoded['projects'];
            }
        }

        // If JSON parsing fails, return empty array (let caller handle fallback)
        return [];
    }

    private function getFallbackIdeas(array $techs, string $difficulty): array
    {
        return [
            [
                'name' => 'Personal Portfolio Website',
                'description' => 'Build a responsive portfolio website to showcase your projects and skills.',
                'features' => ['Responsive design', 'Project gallery', 'Contact form', 'About section'],
                'estimatedTime' => '1-2 weeks',
                'learningOutcomes' => ['Frontend development', 'Responsive design', 'API integration']
            ],
            [
                'name' => 'Task Management App',
                'description' => 'Create a simple task management application with CRUD operations.',
                'features' => ['Add/edit/delete tasks', 'Mark as complete', 'Categories', 'Search functionality'],
                'estimatedTime' => '2-3 weeks',
                'learningOutcomes' => ['State management', 'CRUD operations', 'User interface design']
            ]
        ];
    }
}