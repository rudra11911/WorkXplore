// Import Required modules and packages

import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongodbconnect from './utils/db.js';

//importing the routes
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js';  
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config({});
const PORT = process.env.PORT || 5000;

// Create an express application
const app = express();

//adding Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//setting cors for backend and frontend connection
//starting frontend server on port 5173
app.use(cors({
    origin: '*'
  } ,
  {
    credentials: true
  }
));


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>WorkXplore API</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 1.25rem;
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .tag {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .btn {
          background-color: #00c6ff;
          background-image: linear-gradient(to right, #0072ff, #00c6ff);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 30px;
          cursor: pointer;
          transition: background 0.3s ease;
          text-decoration: none;
        }
        .btn:hover {
          background-image: linear-gradient(to right, #0055cc, #009acc);
        }
        @media (max-width: 600px) {
          h1 { font-size: 2rem; }
          p { font-size: 1rem; }
        }
      </style>
    </head>
    <body>
      <div class="tag">Welcome to</div>
      <h1>WorkXplore Backend</h1>
      <p>This is the API server for the WorkXplore platform. Click below to explore the Swagger documentation.</p>
      <a href="/api-docs" class="btn">Open Swagger Docs</a>
    </body>
    </html>
  `);
});


//Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/company' , companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes);
app.use('/api/v1/admin', adminRoutes);

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//code for the payment method using the stripe API
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert ₹ to paise
            currency: 'inr',
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



//Running the server on the defined PORT
app.listen(PORT, () => {
    mongodbconnect();
    console.log(`Server is running on port ${PORT}`);
    });
