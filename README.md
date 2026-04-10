

## Overview

This project is a full-stack React Native Movies App built from start to finish as an integrated mobile application. Users can browse movies and TV shows, view media information, manage accounts securely, maintain a personalized saved library, and interact with an in-app AI assistant named Raya for movie and TV recommendations.

The project combines a React Native frontend with a Node.js/Express backend, secure authentication, protected API access, and a deployed production backend.

## Main Features

- Browse movies and TV shows by category, including now playing, upcoming, airing today, popular, and top rated
- Search across movies and TV shows
- View detailed information about movies and TV shows 
- Create an account with email/password or sign in with Google
- Complete and manage profile details including name, email, phone number, country, and profile image
- Save movies and TV shows to a personal library for each user account
- Use an in-app AI assistant named Raya for conversational movie and TV recommendations
- Save recommended titles directly from the Raya chat into the user library

## Authentication And Security

- Email/password authentication and Google OAuth sign-in
- Provider-aware account behavior so users authenticate using the same method their account was created with
- Passwords hashed and salted with bcrypt
- JWT-based protection for private backend routes
- Token-based authenticated requests for profile, saved-library, and account operations
- Protected per-user data access so profile and library data are only available in authenticated contexts

## AI Assistant

Raya is an in-app AI assistant available through a floating chat button. It provides movie and TV recommendations grounded in TMDB data, supports recommendations based on trends, genres, and user prompts, maintains multi-turn context during a conversation, and supports natural-language save actions such as 'save it' or 'add [title] to my saved library'.


## Deployment

The backend is deployed to AWS EC2 for live mobile use. PM2 is used for process management, Nginx is configured as a reverse proxy, and traffic is routed through Cloudflare with HTTPS so the mobile app can communicate securely with the backend over a public endpoint.
