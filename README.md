# Brisbane Logistics Admin Portal

<p align="center">
    <img src="./public/assets/icons/brisbane.svg" alt="Brisbane Logistics Logo" width="180">
</p>

<h1 align="center">
    <b>Brisbane Logistics Admin Portal</b>
</h1>

<p align="center">
    A modern administration portal for managing Brisbane Logistics operations, content, users, and business processes.
</p>

<div align="center">

![version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![frontend](https://img.shields.io/badge/frontend-React%20%7C%20TypeScript-blue.svg)
![ui](https://img.shields.io/badge/UI-Material--UI-blue.svg)
![backend](https://img.shields.io/badge/backend-Laravel-red.svg)

</div>

---

## Overview

The Brisbane Logistics Admin Portal is a modern web-based administration system developed to support the company's internal management and operational requirements.

Built with React, TypeScript, and Material UI (MUI), the application provides a responsive and structured interface for managing administrative functions and interacting with the Laravel backend API.

The system follows a modular architecture designed to support maintainability, scalability, and future enhancements.

## Technology Stack

### Frontend
- React
- TypeScript
- Material UI (MUI)
- Vite
- Axios

### Backend
- PHP
- Laravel
- Laravel Sanctum
- RESTful API
- AES-256-GCM API encryption

### Development Environment
- Node.js
- NPM
- Git

## Core Features

- Administrative dashboard
- User authentication and session management
- API integration with Laravel
- Encrypted API request and response handling
- Centralized API error handling
- Modular and reusable components
- Responsive user interface
- Centralized theme and styling configuration

## Project Structure

The frontend follows a feature-oriented architecture, separating application features, reusable components, utilities, and shared configurations.

```text
brisbane-logistics/
│
├── app/                  # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── backend/              # Laravel API
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── routes/
    └── ...
```

*The directory structure above is a high-level illustration. Refer to the actual repository for the complete structure.*

## Quick Start

### Requirements

Make sure the following are installed:

- Node.js (LTS)
- NPM
- PHP (compatible with the Laravel project)
- Composer
- MySQL or MariaDB

### Frontend Installation

1. Navigate to the frontend directory:

   ```bash
   cd app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the frontend environment variables using the provided environment example.

4. Start the development server:

   ```bash
   npm run dev
   ```

### Backend Installation

1. Navigate to the Laravel backend directory.

2. Install PHP dependencies:

   ```bash
   composer install
   ```

3. Configure the backend environment:

   ```bash
   cp .env.example .env
   ```

4. Generate the Laravel application key:

   ```bash
   php artisan key:generate
   ```

5. Configure the database credentials and other required environment variables.

6. Run database migrations:

   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:

   ```bash
   php artisan serve
   ```

## Security

The application uses Laravel Sanctum for session-based authentication and AES-256-GCM for API payload encryption.

Sensitive configuration values, application keys, and credentials must be maintained in environment variables and must never be committed to version control.

HTTPS should be enabled in production.

## Development

The project is maintained using Git version control.

Before committing changes, ensure that:

- The application builds successfully.
- Existing functionality remains operational.
- API integrations are working.
- No environment secrets or credentials are included in commits.

## License

This project is maintained for Brisbane Logistics.

Third-party libraries and dependencies remain subject to their respective licenses.

---

**Brisbane Logistics**  
Admin Portal