const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
const passport = require("passport");
const authRoute = require("../routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const app = express();


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);


app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
// app.use(cors());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
// Connect to MongoDB
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());


// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes); // Use campaign routes
app.use("/auth", authRoute);

// Start Server
const PORT = config.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
