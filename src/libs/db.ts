import { v4 as uuidv4 } from "uuid";
import { Note } from "../app/types/note";

export async function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    let db;

    // window.indexedDB.deleteDatabase("LinkedInToolsDb");

    const request = window.indexedDB.open("LinkedInToolsDb", 1);

    request.onerror = (event: any) => {
      reject(event);
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event: any) => {
      console.log("start");

      const db = event.target.result;

      const objectStore = db.createObjectStore("notes", {
        keyPath: "id",
        autoIncrement: true,
      });

      console.log(objectStore);

      objectStore.createIndex("id", "id", { unique: true });
      objectStore.createIndex("username", "username", { unique: false });
      objectStore.createIndex("text", "text", { unique: false });
    };
  });
}
