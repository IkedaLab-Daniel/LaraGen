# LaraGen API Documentation

This documentation provides a detailed overview of the LaraGen API, its endpoints, and how to interact with them.

## Authentication

Most of the endpoints require authentication using Laravel Sanctum. To authenticate, you need to obtain a token by using the `/login` or `/register` endpoints. Once you have a token, you must include it in the `Authorization` header of your requests as a Bearer token:

```
Authorization: Bearer <YOUR_TOKEN>
```

## Endpoints

### Project Ideas

#### Generate Project Ideas

- **Method:** `POST`
- **Path:** `/api/generate-ideas`
- **Description:** Generates project ideas based on specified technologies and difficulty.
- **Request Body:**
  ```json
  {
    "techs": ["React", "Laravel"],
    "difficulty": "intermediate"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": "true",
    "data": {
      "projects": [
        {
          "name": "Project Name",
          "description": "Project Description",
          "features": ["Feature 1", "Feature 2"],
          "estimated_time": "2-3 weeks",
          "learning_outcomes": ["Learn React hooks", "Learn Laravel routing"],
          "difficulty": "intermediate",
          "tech_stack": ["React", "Laravel"]
        }
      ],
      "requested_techs": ["React", "Laravel"],
      "request_difficulty": "intermediate"
    },
    "message": "Project idea generated successfully"
  }
  ```
- **Error Response (500):**
  ```json
  {
    "success": "false",
    "message": "Failed to generate project idea",
    "error": "Internal Server Error"
  }
  ```

#### Get Options

- **Method:** `GET`
- **Path:** `/api/options`
- **Description:** Retrieves available technologies and difficulty levels for generating project ideas.
- **Success Response (200):**
  ```json
  {
    "success": "true",
    "data": {
      "available_techs": {
        "frontend": ["React", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js"],
        "backend": ["Laravel", "Node.js", "Express.js", "Django", "FastAPI", "Spring Boot"],
        "database": ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"],
        "mobile": ["React Native", "Flutter", "Ionic", "Swift", "Kotlin"],
        "other": ["TypeScript", "GraphQL", "Docker", "AWS", "Firebase", "Tailwind CSS"]
      },
      "difficulty_levels": {
        "beginner": "New to programming or learning fundamentals",
        "intermediate": "Comfortable with basics, ready for more complex challenge",
        "advanced": "Experienced developer looking for challenging projects"
      }
    },
    "message": "Available options retrieved successfully"
  }
  ```

### Saved Projects

#### Get Public Projects

- **Method:** `GET`
- **Path:** `/api/projects`
- **Description:** Retrieves a paginated list of public saved projects.
- **Query Parameters:**
  - `per_page` (optional): Number of projects per page (default: 12, min: 1, max: 50).
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "current_page": 1,
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "name": "Public Project",
          "description": "This is a public project.",
          "is_public": true,
          "aura_count": 10,
          "created_at": "2025-09-08T12:00:00.000000Z",
          "updated_at": "2025-09-08T12:00:00.000000Z",
          "user": {
            "id": 1,
            "name": "John Doe"
          },
          "has_aura": false
        }
      ],
      "first_page_url": "/api/projects?page=1",
      "from": 1,
      "last_page": 1,
      "last_page_url": "/api/projects?page=1",
      "links": [...],
      "next_page_url": null,
      "path": "/api/projects",
      "per_page": 12,
      "prev_page_url": null,
      "to": 1,
      "total": 1
    },
    "message": "Public projects retrieved successfully"
  }
  ```

#### Get User's Saved Projects

- **Method:** `GET`
- **Path:** `/api/my-projects`
- **Authentication:** Required
- **Description:** Retrieves a paginated list of the authenticated user's saved projects.
- **Query Parameters:**
  - `per_page` (optional): Number of projects per page (default: 12, min: 1, max: 50).
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": [...], // Array of project objects
    "meta": {
      "current_page": 1,
      "last_page": 1,
      "per_page": 12,
      "total": 1,
      "from": 1,
      "to": 1
    },
    "message": "Your saved projects retrieved successfully"
  }
  ```

#### Save a New Project

- **Method:** `POST`
- **Path:** `/api/projects`
- **Authentication:** Required
- **Description:** Saves a new project for the authenticated user.
- **Request Body:**
  ```json
  {
    "name": "My New Project",
    "description": "Description of my new project.",
    "features": ["Feature A", "Feature B"],
    "estimated_time": "1 week",
    "learning_outcomes": ["Learn something new"],
    "difficulty": "beginner",
    "tech_stack": ["PHP", "JavaScript"],
    "is_public": false
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "data": { ... }, // The created project object
    "message": "Project saved successfully"
  }
  ```

#### Get a Specific Project

- **Method:** `GET`
- **Path:** `/api/projects/{savedProject}`
- **Description:** Retrieves a specific saved project.
- **Parameters:**
  - `savedProject`: The ID of the saved project.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": { ... }, // The project object
    "message": "Project retrieved successfully"
  }
  ```
- **Error Response (403):**
  ```json
  {
    "success": false,
    "message": "This project is private"
  }
  ```

#### Update a Project

- **Method:** `PUT`
- **Path:** `/api/projects/{savedProject}`
- **Authentication:** Required
- **Description:** Updates a saved project. Only the owner can update.
- **Parameters:**
  - `savedProject`: The ID of the saved project.
- **Request Body:** (same as save new project, but fields are optional)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": { ... }, // The updated project object
    "message": "Project updated successfully"
  }
  ```
- **Error Response (403):**
  ```json
  {
    "success": false,
    "message": "You can only update your own projects"
  }
  ```

#### Delete a Project

- **Method:** `DELETE`
- **Path:** `/api/projects/{savedProject}`
- **Authentication:** Required
- **Description:** Deletes a saved project. Only the owner can delete.
- **Parameters:**
  - `savedProject`: The ID of the saved project.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Project deleted successfully"
  }
  ```
- **Error Response (403):**
  ```json
  {
    "success": false,
    "message": "You can only delete your own projects"
  }
  ```

### Project Aura

#### Toggle Aura

- **Method:** `POST`
- **Path:** `/api/projects/{savedProject}/aura`
- **Authentication:** Required
- **Description:** Adds or removes an "aura" (like) for a saved project.
- **Parameters:**
  - `savedProject`: The ID of the saved project.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Aura given successfully! ✨", // or "Aura removed successfully"
    "data": {
      "aura_count": 11,
      "has_aura": true
    }
  }
  ```

#### Get Aura Status

- **Method:** `GET`
- **Path:** `/api/projects/{savedProject}/aura`
- **Description:** Retrieves the aura count and whether the current user (if authenticated) has given an aura to the project.
- **Parameters:**
  - `savedProject`: The ID of the saved project.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "aura_count": 10,
      "has_aura": false
    }
  }
  ```

### Statistics

#### Get Site Statistics

- **Method:** `GET`
- **Path:** `/api/stats`
- **Description:** Retrieves statistics about the site.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": {
        "total_projects_generated": 100,
        "total_users": 50,
        "total_auras": 200
    },
    "message": "Statistics retrieved successfully"
  }
  ```
