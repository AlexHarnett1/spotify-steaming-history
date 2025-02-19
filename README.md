# spotify-steaming-history
To start, you must run the following command in your terminal:
createdb spotifydb

To get server up and running go to root folder and run:
npx ts-node src/app.ts

To compile public typescripts go to public/src folder and run:
npx tsc

Sample object of musical track within Spotfy history files:
{
  "ts": "2024-05-23T06:49:10Z",
  "platform": "osx",
  "ms_played": 220538,
  "conn_country": "SG",
  "ip_addr": "38.150.99.14",
  "master_metadata_track_name": "Go Back (feat. Julia Church)",
  "master_metadata_album_artist_name": "John Summit",
  "master_metadata_album_album_name": "Go Back (feat. Julia Church)",
  "spotify_track_uri": "spotify:track:68R0zVUeMJ2C852Ov6d2Mh",
  "episode_name": null,
  "episode_show_name": null,
  "spotify_episode_uri": null,
  "audiobook_title": null,
  "audiobook_uri": null,
  "audiobook_chapter_uri": null,
  "audiobook_chapter_title": null,
  "reason_start": "trackdone",
  "reason_end": "trackdone",
  "shuffle": false,
  "skipped": false,
  "offline": false,
  "offline_timestamp": 1716446730,
  "incognito_mode": false
}

Sample object of podcast episode play:
{
    "ts": "2019-06-17T17:59:03Z",
    "platform": "iOS 12.1.4 (iPhone9,1)",
    "ms_played": 1277269,
    "conn_country": "US",
    "ip_addr": "66.170.185.132",
    "master_metadata_track_name": null,
    "master_metadata_album_artist_name": null,
    "master_metadata_album_album_name": null,
    "spotify_track_uri": null,
    "episode_name": "The Future of Everything Festival: What's Next for Alexa?",
    "episode_show_name": "WSJ’s The Future of Everything",
    "spotify_episode_uri": "spotify:episode:2aPctXuvFf4qU2o0FyEPSW",
    "audiobook_title": null,
    "audiobook_uri": null,
    "audiobook_chapter_uri": null,
    "audiobook_chapter_title": null,
    "reason_start": "clickrow",
    "reason_end": "endplay",
    "shuffle": false,
    "skipped": false,
    "offline": false,
    "offline_timestamp": null,
    "incognito_mode": false
  }