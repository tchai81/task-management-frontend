This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. **Node.js Version**: Ensure you have Node.js version 18.17 or higher installed.
2. **Clone the Repository**: Clone this repository into a folder of your choice using:
   ```bash
   git clone <repository-url>
   ```
3. **Install Dependencies**: Navigate to the project directory and run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```
4. **Environment Configuration**:
   - Rename `.env.sample` to `.env.local`.
   - Update the variables in `.env.local`. Specifically, update the `NEXT_PUBLIC_API_URL` variable to point to your API server.
5. **Run the Development Server**: Start the development server with:
   ```bash
   npm run dev
   ```
6. **Production Build**: To prepare your application for production, run the following command to build the necessary assets:
   ```bash
   npm run build
   ```
7. **Start the Production Server**: Once built, start the server on your production environment using:
   ```bash
   npm run start
   ```
8. You can access the development server by navigating to: http://localhost:3000
