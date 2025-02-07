import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL as string);

const createTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS listen_instances (
        id SERIAL PRIMARY KEY,
        ts TIMESTAMP NOT NULL,
        platform TEXT NOT NULL,
        ms_played INTEGER NOT NULL,
        conn_country TEXT NOT NULL,
        ip_addr TEXT NOT NULL,
        master_metadata_track_name TEXT,
        master_metadata_album_artist_name TEXT,
        master_metadata_album_album_name TEXT,
        spotify_track_uri TEXT,
        episode_name TEXT,
        episode_show_name TEXT,
        spotify_episode_uri TEXT,
        audiobook_title TEXT,
        audiobook_uri TEXT,
        audiobook_chapter_uri TEXT,
        audiobook_chapter_title TEXT,
        reason_start TEXT NOT NULL,
        reason_end TEXT NOT NULL,
        shuffle BOOLEAN NOT NULL,
        skipped BOOLEAN NOT NULL,
        offline BOOLEAN NOT NULL,
        offline_timestamp BIGINT,
        incognito_mode BOOLEAN NOT NULL
      )
    `);
    console.log("Table listen_instances created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pgp.end(); // Close connection
  }
};

createTable();

async function addListenInstances(instances: ListenInstance) {
  
}

export interface ListenInstance{
  "ts": string;
  "platform": string;
  "ms_played": number;
  "conn_country": string;
  "ip_addr": string;
  "master_metadata_track_name": string | null;
  "master_metadata_album_artist_name": string | null;
  "master_metadata_album_album_name": string | null;
  "spotify_track_uri": string | null;
  "episode_name": string | null;
  "episode_show_name": string | null;
  "spotify_episode_uri": string | null;
  "audiobook_title": string | null;
  "audiobook_uri": string | null;
  "audiobook_chapter_uri": string | null;
  "audiobook_chapter_title": string | null;
  "reason_start": string;
  "reason_end": string;
  "shuffle": boolean;
  "skipped": boolean;
  "offline": boolean;
  "offline_timestamp": number | null;
  "incognito_mode": boolean;
}

let listen: ListenInstance = {
  "ts": "2024-01-20T23:30:00Z",
  "platform": "ios",
  "ms_played": 4509,
  "conn_country": "US",
  "ip_addr": "174.62.112.252",
  "master_metadata_track_name": "Money Long (feat. 42 Dugg)",
  "master_metadata_album_artist_name": "DDG",
  "master_metadata_album_album_name": "Money Long (feat. 42 Dugg)",
  "spotify_track_uri": "spotify:track:0U8AQGK1eB9b1mINnFMicZ",
  "episode_name": null,
  "episode_show_name": null,
  "spotify_episode_uri": null,
  "audiobook_title": null,
  "audiobook_uri": null,
  "audiobook_chapter_uri": null,
  "audiobook_chapter_title": null,
  "reason_start": "trackdone",
  "reason_end": "fwdbtn",
  "shuffle": true,
  "skipped": true,
  "offline": false,
  "offline_timestamp": 1705793395,
  "incognito_mode": false
}



export default db;
