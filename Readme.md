# Image-Uploader

Create a web application, where you can upload images, view the uploaded images, perform the search operation.

Features to be implemented
1. Signup
2. Login
3. Logout
4. Upload Image
--- Required fields: Name, Image
5. Users can only see the images they have uploaded.
6. Users can perform search operations only on their images.

## Tech Stack  used
1. Back End: NodeJS
2. Front End: ReactJS
3. Database: MongoDB

## Getting Started

To run this repo locally on your machine, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/Carbrex/Lakshya-dobby.git
   ```

2. Navigate to the project directory:

   ```shell
   cd Image-Uploader/
   ```

3. Install the dependencies for the backend:

   ```shell
   cd backend
   npm install
   ```

4. Install the dependencies for the frontend:

   ```shell
   cd ../frontend
   npm install
   ```

5. Make a `.env` in the backend directory and update the configuration values with your own:

   - Set the `MONGO_URI` to your MongoDB connection string
   - Set the `JWT_SECRET` to a secret key for JWT authentication
   - Set the `JWT_LIFETIME` JWT liftime

6. Start the frontend server in the frontend directory:

   ```shell
   npm run dev
   ```

7. Start the backend server in the backend directory:

   ```shell
   npm run dev
   ```

8. Access the web app in your web browser at `http://localhost:5173`.
