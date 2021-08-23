const fs = require("fs");
const SpotifyWebApi = require("spotify-web-api-node");
const token =
  "BQCsX6TiuZLo4apkI4Rc8FxYE8Zjbmc4jZIilljf6QM7zQEr0HvZGmuS6unrBEw0zMC8bLTwK1R0y8MpGc4PNwwvHy3Zy44PXlm5OMotVDcTdANPOb6f_DiTaNv7hAyIKd9cl39a9LbBg-haLb0S9_0OEbtXXEBElbyzAfptiLhoaqoSvTJLso0P4n54fTUj9NaPE2x77OrWItLYwR8D0utOujnidll-FEZAzKFwo36QUBXrnvfumYqTWvPYLLzc9BxByKZGSYh7epZuiRUHQkfu5AfOalo";
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    //console.log("this is me.body", me.body);
    //getUserPlaylists(me.body.id);
    getTopArtistsLongTerm();
    getTopArtistsMediumTerm();
    getTopArtistsShortTerm();
  })().catch((e) => {
    console.error(e);
  });
}
// get top artists - livs attempt

async function getTopArtistsLongTerm() {
  const data = await spotifyApi.getMyTopArtists({
    time_range: "long_term",
    limit: 8,
  });
  console.log(
    "LONG TERM: top artists",
    data.body.items.map((item) => item.name)
  );
}

async function getTopArtistsMediumTerm() {
  const data = await spotifyApi.getMyTopArtists({
    time_range: "medium_term",
    limit: 8,
  });
  console.log(
    "MEDIUM TERM: top artists",
    data.body.items.map((item) => item.name)
  );
}

async function getTopArtistsShortTerm() {
  const data = await spotifyApi.getMyTopArtists({
    time_range: "short_term",
    limit: 8,
  });
  console.log(
    "SHORT TERM: top artists",
    data.body.items.map((item) => item.name)
  );
}
//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName);

  // console.log("this is data.body.items[0].name", data.body.items[0]);

  console.log("---------------+++++++++++++++++++++++++");
  let playlists = [];

  for (let playlist of data.body.items) {
    // console.log(playlist.name + "     " + playlist.id);

    //let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    //console.log(tracks);

    const tracksJSON = { tracks };
    let data = JSON.stringify(tracksJSON.tracks.map((t) => t.name)); // works!
    fs.writeFileSync("FifthGo" + playlist.name + ".json", data); // works!
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 30,
    fields: "items",
  });

  //console.log("The playlist contains these tracks", data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  console.log("'" + playlistName + "'" + " contains these tracks:");
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name);
  }

  console.log("---------------+++++++++++++++++++++++++");
  return tracks;
}

getMyData();
