# Product Feature Management System

A web application for tracking the lifecycle of product enhancements and feature requests.

## Project Overview

This solution implements a feature management system with an Angular frontend and .NET Core Web API backend. The system allows users to create, track, and manage product features through their development lifecycle.

## Technical Stack

- **Frontend**: Angular
- **Backend**: ASP.NET Core Web API (.NET 8.0)
- **Database**: Microsoft SQL Server
- **Source Control**: Git

## Feature Requirements

### Product Feature Fields

| Field Name             | Description                  | Validation Rules                                               |
| ---------------------- | ---------------------------- | -------------------------------------------------------------- |
| Title                  | Feature name/description     | - Required<br>- Max 1000 characters                            |
| Description            | Detailed feature description | - Max 5000 characters                                          |
| Estimated Complexity   | Size estimation              | - Required<br>- Allowed values: S, M, L, XL                    |
| Status                 | Current state                | - Required<br>- Allowed values: New, Active, Closed, Abandoned |
| Target Completion Date | Planned completion           | - Required when Status is Active<br>- Must be a future date    |
| Actual Completion Date | Real completion date         | - Required when Status is Closed<br>- Must be a future date    |

## Development Setup

1. Clone the repository

```bash
git clone [repository-url]
```
