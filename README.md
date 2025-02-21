# Product Feature Management System

A web application for tracking the lifecycle of product enhancements and feature requests.

## Project Overview

This solution implements a feature management system with an Angular frontend, .NET Core Web API backend and SQL Server database. The system allows users to create, track (status and completion dates), and manage product features through their development lifecycle.

## Technical Stack

- **Frontend**: Angular
- **Backend**: ASP.NET Core Web API (.NET 8.0)
- **Database**: Microsoft SQL Server
- **Source Control**: Git

## Development Setup

### Prerequisites

- Node.js (v18 or later)
- .NET 8.0 SDK
- SQL Server (Local or Express)
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd back/adlib-coding-challenge-back/back-end
```

2. Update the connection string in `appsettings.json` to match your SQL Server instance

3. Run database migrations:

```bash
dotnet ef database update
```

4. Start the backend server:

```bash
dotnet run
```

The API will be available at `https://localhost:7243`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd front/product-feature-management
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200`

## Running Tests

### Backend Tests

```bash
cd back/adlib-coding-challenge-back/back-end
dotnet test
```

### Frontend Tests

```bash
cd front/product-feature-management
ng test
```

## Usage

1. Start both the backend and frontend servers
2. Navigate to `http://localhost:4200` in your browser
3. Use the interface to manage product features:
   - View all features
   - Create new features
   - Edit existing features
   - Delete features
