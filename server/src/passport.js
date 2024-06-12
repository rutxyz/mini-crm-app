const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// const User = require('./models/User');


passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user.id); // Store only the user ID in the session
  });
  
  const User = require('./models/User'); // Import your User model

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user); // Pass the user object to done
  });
});

 
  