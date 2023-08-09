import { Note } from "../app/types/note";

type DbEvent<T> = Event & {
  target: {
    result: T;
  };
};

export const notesRepository = {
  connectNotes: (db: IDBDatabase) => {
    const transaction = db.transaction("notes", "readwrite");

    const notes = transaction.objectStore("notes");

    return notes;
  },
  get: async (db: IDBDatabase, username: string) => {
    return new Promise<Note[]>((resolve, reject) => {
      const notes = notesRepository.connectNotes(db);

      const request = notes.getAll();

      request.onsuccess = function () {
        const result = request.result.filter(
          (note: Note) => note.username === username
        );

        resolve(result);
      };

      request.onerror = function () {
        reject();
      };
    });
  },
  insert: async (db: IDBDatabase, note: Note) => {
    return new Promise((resolve, reject) => {
      const notes = notesRepository.connectNotes(db);

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
      const notes = notesRepository.connectNotes(db);

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
      const notes = notesRepository.connectNotes(db);

      const request = notes.delete(id);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject();
      };
    });
  },
  count: async (db: IDBDatabase) => {
    return new Promise<number>((resolve, reject) => {
      const notes = notesRepository.connectNotes(db);

      const request = notes.count();

      request.onsuccess = function () {
        const result = request.result;

        resolve(result);
      };

      request.onerror = function () {
        reject();
      };
    });
  },
};
