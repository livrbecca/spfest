require("dotenv").config();
const express = require("express");
const cors = require("cors"); // npm install cors --save

const app = express();
var SpotifyWebApi = require("spotify-web-api-node");
app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENTSECRET,

  redirectUri: "http://localhost:8888/callback",
});
const token =
  "BQCRryxQoKX--8p7ibMq6pnsvWKIQmBaE1SsZlQPR8EdWeGFeocS66fNoWyZgi1ey3a8AH8y2fB2O0aXVWmtltK7tsNyEqCC1uYS_xAHgZ2fVR2wo2r-UrBo1ImtXPOJmpes49XRafkom9Y8BpPLMLGE05mYXF9W6vPsaavw3a5AR-w5Ia9mRTsR6YbOXUaYrkazoB14hXPxDdJUshnCvycTKobDHFoWq56W65Sl7lOuUA4Ouz5vz38MDu4Bt6_K7P0jnDFtpRx_ZaWPNTJp_n8UHgaWE70";

spotifyApi.setAccessToken(token);

// credentials are optional

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];
// STEPS: routes for long, medium and short term artists
// check they work via postman
// deploy via heroku to get link
// test via react/frontend

// route for long term artists
app.get("/topartists/longterm", async (req, res) => {
  const data = await spotifyApi.getMyTopArtists({
    time_range: "long_term",
    limit: 8,
  });
  res.json({
    message: "your top artists over the past several years",
    top_artists: data.body.items.map((item) => item.name),
  });
});

app.get("/topartists/mediumterm", async (req, res) => {
  //console.log(process.env);
  const data = await spotifyApi.getMyTopArtists({
    time_range: "medium_term",
    limit: 8,
  });

  res.json({
    message: "your top artists over the past 6 months",
    top_artists: data.body.items.map((item) => item.name),
  });
});

app.get("/topartists/shortterm", async (req, res) => {
  //console.log(process.env);
  const data = await spotifyApi.getMyTopArtists({
    time_range: "short_term",
    limit: 8,
  });

  res.json({
    message: "your top artists over the past 4 weeks",
    top_artists: data.body.items.map((item) => item.name),
  });
});

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log("access_token:", access_token);
      console.log("refresh_token:", refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send("Success! You can now close the window.");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(process.env.PORT, () =>
  console.log(
    "livs HTTP Server up. Now go to http://localhost:8888/login in your browser."
  )
);

// personalization API
// GET https://api.spotify.com/v1/me/top/{type}
// HEADER, Authorization - required
// {type} - required, only valid values: artists / tracks

// query param: time_range
// long_term - several years
// medium_term - 6 months (default)
// short_term - 4 weeks

// query param: limit
// deafult 20
// e.g limit=15

//https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=5

//http://localhost:8888/callback?code=AQDOSzmJ8jpkiT9X278LCnkOI0zTuhYMgNL96hg9G7XdmHjxZ7a6-t05ryNoewA2UaPZrZGGw2O4CzUv8iy8HUJ7yB_nsV-3Srz0qqgLFNVvC2NcuVLAwnfD_K0M-g7YNYz3VvAVqGPw5TWl8bySKKPYh48iPH707cgUe71GpJG3aTPU5OzFE2YI7aB7WJcuv7hbYmEm4k-2M5qtcTVAx4yE5-aZPDYKc9AmkypMUnhivqSzxuHvrjeNdvRY9n6oKi8ewK63yuNg60dECu7nv7Niv9hED_ehqhACoPe_CLiB010Ztmdjzy3ymN4X0c3gSLRVvvphMnlPnmlUzlhzo9drlUobSVjOFULdsFzRDSFzhOGpTHEyktBe3AhqAdZSSblTfM1EgirssOrr-ZUXQ7IFG1nZ8cbrcONz2asTDG8Sh-dugptyRfQ0Tmw7jbbVZm-WKE5pgt9U6XEyPUagETDj18WrszqZQgKA9ZLSrAIvK2CVzWbGZqhSc9GyhaY_B12x-LXkUGwCiWRT1QsfmW6Bpkg3l7g6fpZJadG2nPdCmhBSHfW_KjhXlqvXG0asuKN1Aq6U435ecyd5SMXP8BAh4C-CCbGiGk8-0rClhBvQ2jHPu8fr5Ls1sZgFYf_uT3aughQp7ymfxmfllD_TkUUdE7-7t9_PB9QoIlbm2iFpvCs6h1ghzlDtzCNBEs4fTx2PsnwHtqzf9ZO79DqzdU_UFIU

// access token = BQBWxrKG1esFexUjXT3bXvueVNQUplYscM60h25h2LVRyzNqaWQc3xNn8U3ZAkL_olEtCOu7_F2n9boXLaxxrfinCsrl-CKFQRYj7nR47e3jyTaUfc6_c6kXOXUqZiWLoO9BwuTU_nMwhXLaJzY-4g2PR4_EJ_IgMcm54qwiselIj_SJN97zpq3p1jr7eYOP7WH-bVepWFH-JMlXXn_dOHcgiVycFkVKBhLcVABZuc0OYlg61yUrMsD8iEll11RIbP5Xtfz5_r-dWkrFB_LHZkI5J1Unqkk
