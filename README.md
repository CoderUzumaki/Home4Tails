# Home4Tails

## About
Home4Tails is a pet adoption and shelter support platform designed to connect rescued animals with loving homes. It also enables donations and volunteer recruitment to support animal shelters.

## Note : 
It is still in development stage, and not complete yet!

## Features
- **Pet Adoption**: Browse and adopt pets looking for a home.
- **Shelter Support**: Donate to pet shelters and help improve animal welfare.
- **Volunteer Opportunities**: Sign up to volunteer at local animal shelters.
- **User Profiles**: Create an account, manage adoptions, and track donations.
- **Secure Payments**: Safe and seamless donation processing.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Payment Gateway**: Stripe (for donations)

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB set up locally or on a cloud service

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Home4Tails.git
   cd Home4Tails
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET=your_stripe_secret
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
| Endpoint         | Method | Description                  |
|-----------------|--------|------------------------------|
| `/api/pets`     | GET    | Fetch all available pets    |
| `/api/adopt`    | POST   | Submit adoption request     |
| `/api/donate`   | POST   | Process donations          |
| `/api/volunteer`| POST   | Sign up for volunteering   |

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

