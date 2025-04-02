AgriLink Rwanda

Overview
AgriLink Rwanda is an innovative platform designed to connect farmers, buyers, and agronomists. The platform facilitates seamless transactions, knowledge sharing, and resource management to enhance agricultural productivity and market accessibility.

Technologies Used

Frontend

React.js
CSS

Backend

Node.js
Express.js
MongoDB
Cloudinary (for image storage)
- Nodemailer (for email communication)
- JSON Web Token (JWT) (for authentication)

Deployment

Frontend:Vercel (https://vercel.com/)

Backend:Render(https://render.com/)

Prerequisites
Before you begin, ensure you have the following installed:

Node.js(https://nodejs.org/)

npm(https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

MongoDB Atlas(https://www.mongodb.com/cloud/atlas) account

Cloudinary(https://cloudinary.com/) account

Environment Setup

Clone the Repository

git clone https://github.com/kellenmurerwa/AgriLink-Rwanda.git

cd AgriLink-Rwanda


Install Dependencies

npm install
 or
yarn install

Configure Environment Variables

Create a .env file in the root directory and add the following:

DATABASE_URL=

BASE_URL="http://localhost:5000"

AUTH_EMAIL=

AUTH_PASS=

SECRET_KEY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

Running the Application

Development Mode

npm run dev

or

yarn dev

Production Build

npm run build

npm start

 or
 
yarn build

yarn start

Deployment Steps
1. Set up environment variables in your deployment platform.
2. Connect your GitHub repository to Vercel (frontend) and Render (backend).
3. Configure the build settings as needed.
4. Deploy your application.

Contributing

Development Workflow

1. Fork the repository.
   
3. Create a feature branch:
  
   git checkout -b feature/AmazingFeature
   
4. Commit your changes:
  
   git commit -m 'Add some AmazingFeature'
   
5. Push to the branch:
  
   git push origin feature/AmazingFeature
   
6. Open a Pull Request.

Code Style
- Follow ESLint and Prettier configurations.
- 
- Maintain clean and well-documented code.

 Contact
 
AgriLink Rwanda
Project Repository: [GitHub](https://github.com/kellenmurerwa/AgriLink_backend)
