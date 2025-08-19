<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateProjectIdeasRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false; // ! true
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'techs' => 'required|array|min:1|max:10',
            'techs.*' => 'required|string|max:50',
            'difficulty' => 'required|string|in:beginner,intermediate,advanced'
        ];
    }

    /**
    * ? Get custom error messages for validation rules.
    */
    public function message(): array
    {
        return [
            'techs.required' => 'Please provide at least one technology.',
            'techs.min' => 'Please select at least one technology.',
            'techs.max' => 'Please select no more than 10 technologies.',
            'techs.*.required' => 'Each technology must be a valid string.',
            'techs.*.max' => 'Technology name must not exceed 50 characters.',
            'difficulty.required' => 'Please specify the difficulty level.',
            'difficulty.in' => 'Difficulty must be beginner, intermediate, or advanced.'
        ];
    }
}
