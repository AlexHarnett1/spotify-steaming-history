import db from "../config/db"
import { ListenInstance } from "./interfaces/ListenInstance";

export async function addListenInstances(instances: ListenInstance[]) {
  console.log(instances[0]);
  
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
    console.error(error)
  }
}