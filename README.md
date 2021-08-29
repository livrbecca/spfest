# View your Top Artists on Spotify
![image](https://user-images.githubusercontent.com/69110329/131253030-5710162c-9198-4d93-95e0-e639e75399aa.png)
## To Start
- clone or fork the reposity 
- ``yarn`` or ``npm install`` to install dependencies
- to start the server ``node server.js``

- please note this application only works if the user has a Spotify acccount.

## About This Project
- This project is a simplied backend server, using Node.js, express and the [Spotify API for Developers](https://developer.spotify.com/)
- Use of the Spotify API was aided by the library [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node)

<h4>User's can hit different endpoints to view their Spotify data, including their top artists over the last few years, 6 months and 4 weeks.</h4>

## Endpoints

* **localhost8888/login**
    * this enables you to log in to Spotify
    * you will then be directed to close the window if login successful 
    
    
* **localhost8888/topartists/longterm"**
    * allows you to view your top artists over the span of serveral years / of all time
    * default number of artists shown for all endpoints will **20**, to this change this add a new property called ``limit`` inside ``getMyTopArtists`` oject and add the new number value
    * example:
   
    ``spotifyApi.getMyTopArtists({
      time_range: "long_term",
      limit: 10})``
      
    *note: miniumum is 1, maximum is 50


* **localhost8888//topartists/mediumterm**
    * allows you to see yout top artists over a 6 month time span


* **localhost8888/**/topartists/shortterm
     * allows you to see yout top artists over a 4 week time span
     * note that some users may not have 4 weeks of data if they have not used Spotify in that timeframe

