// require("dotenv").config();
// const express = require("express");
// const cors = require("cors"); // npm install cors --save
// const app = express();
// var SpotifyWebApi = require("spotify-web-api-node");
// app.use(cors());
// app.use(express.json());

// // NEW CHANGE SSDSFSFDFSSSF

// // sever works when running all routes on postman / browser
// // possible addition: errors & unhandled rejections
// // try / catch block, server side will works.

// // HEROKU LINK
// //https://limitless-reaches-08987.herokuapp.com/login - doesn't work
// // site cant be reached, localhost refused to connect, then heroku application error
// const scopes = [
//   "ugc-image-upload",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "user-read-currently-playing",
//   "streaming",
//   "app-remote-control",
//   "user-read-email",
//   "user-read-private",
//   "playlist-read-collaborative",
//   "playlist-modify-public",
//   "playlist-read-private",
//   "playlist-modify-private",
//   "user-library-modify",
//   "user-library-read",
//   "user-top-read",
//   "user-read-playback-position",
//   "user-read-recently-played",
//   "user-follow-read",
//   "user-follow-modify",
// ];

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENTSECRET,
//   redirectUri: "http://localhost:8888/callback",
// });

// // checked with incognito browser: takes you directly to spotifys
// // log in page to sign into your account
// // after log in: browser says: Success! You can now close the window.
// app.get("/login", (req, res) => {
//   res.redirect(spotifyApi.createAuthorizeURL(scopes));
// });

// // now you have an access token, checked with console.log
// app.get("/callback", (req, res) => {
//   const error = req.query.error;
//   const code = req.query.code;
//   const state = req.query.state;

//   if (error) {
//     console.error("Callback Error:", error);
//     res.send(`Callback Error: ${error}`);
//     return;
//   }

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       const access_token = data.body["access_token"];
//       const refresh_token = data.body["refresh_token"];
//       const expires_in = data.body["expires_in"];

//       spotifyApi.setAccessToken(access_token);
//       console.log(access_token);
//       spotifyApi.setRefreshToken(refresh_token);

//       console.log("access_token:", access_token);
//       console.log("refresh_token:", refresh_token);

//       console.log(
//         `Sucessfully retreived access token. Expires in ${expires_in} s.`
//       );
//       res.send("Success! You can now close the window.");

//       setInterval(async () => {
//         const data = await spotifyApi.refreshAccessToken();
//         const access_token = data.body["access_token"];

//         console.log("The access token has been refreshed!");
//         console.log("access_token:", access_token);
//         spotifyApi.setAccessToken(access_token);
//       }, (expires_in / 2) * 1000);
//     })
//     .catch((error) => {
//       console.error("Error getting Tokens:", error);
//       res.send(`Error getting Tokens: ${error}`);
//     });
// });

// // retreieve an access token ?

// // route for artists
// app.get("/topartists/longterm", async (req, res) => {
//   try {
//     const data = await spotifyApi.getMyTopArtists({
//       time_range: "long_term",
//       limit: 8,
//     });

//     res.json({
//       message: "your top artists over the past several years",
//       top_artists: data.body.items.map((item) => item.name),
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

// app.get("/topartists/mediumterm", async (req, res) => {
//   try {
//     const data = await spotifyApi.getMyTopArtists({
//       time_range: "medium_term",
//       limit: 8,
//     });

//     res.json({
//       message: "your top artists over the past 6 months",
//       top_artists: data.body.items.map((item) => item.name),
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

// app.get("/topartists/shortterm", async (req, res) => {
//   try {
//     const data = await spotifyApi.getMyTopArtists({
//       time_range: "short_term",
//       limit: 8,
//     });

//     res.json({
//       message: "your top artists over the past 4 weeks",
//       top_artists: data.body.items.map((item) => item.name),
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

// app.listen(process.env.PORT, () =>
//   console.log(
//     "livs HTTP Server up. Now go to http://localhost:8888/login in your browser."
//   )
// );
