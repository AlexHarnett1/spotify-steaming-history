import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'spotifydb',
  user: 'alexharnett',
  password: 'password',
});

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
  }
};

//createTable();

export default db;