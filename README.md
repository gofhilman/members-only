# Members Only

## Description

Members Only is a web application where users can create and view posts. However, access to certain details depends on the user's role. The application is designed to demonstrate role-based access control, allowing different levels of access for visitors, logged-in users, members, and admins.

Live: <https://members-only-production-3629.up.railway.app/>
Member passcode: BarbieBotAccess

## Features

- **Public Access**: Visitors can view posts, but author names and timestamps are hidden.
- **User Registration and Login**: Users can sign up and log in to create posts.
- **Membership**: Users can enter a passcode to become members, unlocking the ability to see author names and timestamps.
- **Admin Access**: Admins can delete posts and have full visibility of all details.
- **Post Management**: Users can create posts with titles and content.
- **Validation**: Form inputs are validated to ensure data integrity.
- **Authentication**: Secure login system using `passport.js` with session-based authentication.
- **Responsive Design**: The application is mobile-friendly.

## Tech Stack

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for routing and middleware.
- **PostgreSQL**: Relational database for storing session, user, and post data.
- **Passport.js**: Authentication middleware for user login.
- **bcrypt.js**: Library for hashing passwords securely.
- **EJS**: Templating engine for rendering dynamic HTML pages.
- **CSS**: Custom styles with responsive design principles.
- **date-fns**: Library for formatting timestamps.
- **express-validator**: Middleware for validating and sanitizing form inputs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gofhilman/members-only.git
   cd members-only
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the required values for `SESSION_SECRET`, `DATABASE_URL`, `MEMBER_PASSCODE`, and `ADMIN_PASSCODE`.

4. Set up the database:
   - Run the database seed script:
     ```bash
     node db/populatedb.js <your-database-url>
     ```

5. Start the application:
   - For production:
     ```bash
     npm start
     ```
   - For development:
     ```bash
     npm run dev
     ```

6. Open the application in your browser at `http://localhost:3000`.

## Usage

- **Sign Up**: Create an account to start using the application.
- **Log In**: Access your account to create posts.
- **Become a Member**: Enter the member passcode to unlock additional features.
- **Become an Admin**: Enter the admin passcode to gain full control.
