Project Name : PRoject-2-VEHICAL-RENTAL
Live URL:


Features:
1- User registration and login with JWT authentication
2- Role-based authorization (Admin & Customer)
3- Vehicle management (Add, update, delete vehicles)
4- Vehicle availability tracking
5- Booking creation and management
6- Automatic rental cost calculation
7- Secure password hashing using bcrypt


Technology Stack

1- Node.js
2- TypeScript
3- Express.js
4- PostgreSQL
5- JWT (JSON Web Token)
6- bcryptjs

Setup Instructions:

1.Clone the repository
2.Install dependencies
3.Create a .env file in the root directory and add:
4.Run the project


Usage Instructions:
-Register a new user using (/api/v1/auth/signup)
-Login using (/api/v1/auth/signin) to receive a JWT token
-Use the token in Authorization header:
  Authorization: Bearer (token)
-Access protected routes based on user role
