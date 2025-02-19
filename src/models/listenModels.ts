import db from "../config/db"
import { ListenInstance } from "./interfaces/ListenInstance";

export async function deleteAllListenInstances() {
  try {
    await db.none('DELETE FROM listen_instances;')
  } catch (error) {
    console.error('Error deleting old instances:', error);
  }
}

export async function addListenInstances(instances: ListenInstance[]) {
  
  try {
    await Promise.all(instances.map(instance => addListenInstance(instance)));
    console.log("All instances added successfully!");
  } catch (error) {
    console.error("Error adding instances:", error);
  }

}

async function addListenInstance(instance: ListenInstance) {
  const query = `
    INSERT INTO listen_instances (
      ts, platform, ms_played, conn_country, ip_addr, 
      master_metadata_track_name, master_metadata_album_artist_name, 
      master_metadata_album_album_name, spotify_track_uri, 
      reason_start, reason_end, shuffle, skipped, offline, incognito_mode
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  `;
  try {
    await db.none(query, [
      instance.ts, instance.platform, instance.ms_played, instance.conn_country, instance.ip_addr,
      instance.master_metadata_track_name, instance.master_metadata_album_artist_name,
      instance.master_metadata_album_album_name, instance.spotify_track_uri,
      instance.reason_start, instance.reason_end, instance.shuffle, instance.skipped,
      instance.offline, instance.incognito_mode
    ]);
  } catch (error) {
    console.error('Error adding listen instance:', error);
  }
}


async function getTopSongs() {
  // This is incorrect. It needs to be grouped by track_name, track_id so that 
  // songs with the same name aren't grouped together. Ex: Alive
  // Also need to exclude null for the podcasts
  const query = `
    SELECT SUM(ms_played) AS total_ms_played, master_metadata_track_name, spotify_track_uri
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL
    GROUP BY spotify_track_uri, master_metadata_track_name
    ORDER BY total_ms_played DESC;`
}

async function getTopSongsByYear(year: number) {
  const query = `
    SELECT SUM(ms_played) AS total_ms_played, master_metadata_track_name, spotify_track_uri
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL AND EXTRACT(YEAR FROM ts) = $1
    GROUP BY spotify_track_uri, master_metadata_track_name
    ORDER BY total_ms_played DESC;`
  try {
    await db.any(query, year);
  } catch (error) {
    console.error('Error getting Top Songs by year', error);
  }
}

// This works generally, I feel like there could be some missing instances due to songs
// being listed as singles and then added to an album later.
async function getTopAlbums() {
  const query = `
    SELECT SUM(ms_played) AS total_ms_played, master_metadata_album_album_name, master_metadata_album_artist_name
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL
    GROUP BY master_metadata_album_album_name, master_metadata_album_artist_name
    ORDER BY total_ms_played DESC;
    `;
}


async function getTopAlbumsByYear(year: number) {
  const query = `
    SELECT SUM(ms_played) AS total_ms_played, master_metadata_album_album_name, master_metadata_album_artist_name
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL AND EXTRACT(YEAR FROM ts) = $1
    GROUP BY master_metadata_album_album_name, master_metadata_album_artist_name
    ORDER BY total_ms_played DESC;
    `;
  try {
    await db.any(query, year);
  } catch (error) {
    console.error('Error getting Top Songs by year', error);
  }
  
}

async function getTopArtists(){
  const query = `
    SELECT SUM(ms_played) AS total_ms_played, master_metadata_album_artist_name
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL
    GROUP BY master_metadata_album_artist_name
    ORDER BY total_ms_played DESC;
    `;
}

async function getTopArtistsByYear() {
  const query = `
    SELECT SUM(ms_played) AS total_ms_played, master_metadata_album_artist_name
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL AND EXTRACT(YEAR FROM ts) = $1
    GROUP BY master_metadata_album_artist_name
    ORDER BY total_ms_played DESC;
    `;
}

async function getMostSkippedSongs() {
  const query = `
    SELECT COUNT(*) AS times_skipped, master_metadata_track_name, spotify_track_uri
    FROM listen_instances
    WHERE spotify_track_uri IS NOT NULL AND ms_played < 5000 AND EXTRACT(YEAR FROM ts) = 2024
    GROUP BY spotify_track_uri, master_metadata_track_name
    ORDER BY times_skipped DESC;
  `;
}



