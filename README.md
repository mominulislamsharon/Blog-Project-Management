# Blog Project: 

Blog-Project-Management

live link: https://blog-project-managment.vercel.app/

## Overview

This project involves building a backend for a blogging platform with two primary roles: **Admin** and **User**. The platform allows users to perform CRUD operations on their own blogs, while admins can manage users and delete any blogs. The system includes secure authentication, role-based access control, and a public API for viewing blogs with advanced search, sort, and filter functionalities.

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

---

## Features and Requirements

### 1. User Roles
#### Admin
- Manually created in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating a `isBlocked` property.
- Cannot update any blog.

#### User
- Can register and log in.
- Can create, update, and delete their own blogs (requires login).
- Cannot perform admin actions.

---


### 2. Authentication & Authorization
#### Authentication
- Users must log in to perform create, update, and delete operations.

#### Authorization
- Role-based access control:
  - Admin has permissions to manage users and blogs.
  - Users can only manage their own blogs.

---
### 3. Blog API
A public API for reading blogs with the following functionalities:
- Search by title or content.
- Sort by fields like `createdAt` or `title`.
- Filter by author ID.

---
