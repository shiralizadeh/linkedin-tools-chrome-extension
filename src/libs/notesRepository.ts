import { Note } from "../app/types/note";

export const notesRepository = {
  get: async (db: IDBDatabase, username: string) => {
    return new Promise<Note[]>((resolve, reject) => {
      const transaction = db.transaction("notes", "readwrite");

      const notes = transaction.objectStore("notes");

      const query = notes.getAll();

      query.onsuccess = function (event: any) {
        const result = event.target.result.filter(
          (note: Note) => note.username === username
        );

        resolve(result);
      };

      query.onerror = function (event: any) {
        reject();
      };
    });
  },
  insert: async (db: IDBDatabase, note: Note) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("notes", "readwrite");

      const notes = transaction.objectStore("notes");

      const request = notes.add(note);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject();
      };
    });
  },
  update: async (db: IDBDatabase, note: Note) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("notes", "readwrite");

      const notes = transaction.objectStore("notes");

      const request = notes.put(note);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject();
      };
    });
  },
  delete: async (db: IDBDatabase, id: string) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("notes", "readwrite");

      const notes = transaction.objectStore("notes");

      const request = notes.delete(id);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject();
      };
    });
  },
};
