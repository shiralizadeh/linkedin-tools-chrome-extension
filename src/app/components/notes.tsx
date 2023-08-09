import { For, createEffect, createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../types/note";
import { EditNote } from "./editNote";
import { openDb } from "../../libs/db";
import { extractUsername } from "../../utilities";
import { notesRepository } from "../../libs/notesRepository";

import "./notes.scss";
import { COMMENTS_LIMIT } from "../../constants";

type Props = {};

function observerUrl(callback: () => void) {
  var previousUrl = location.href;

  var observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl) {
      previousUrl = location.href;

      callback();
    }
  });

  const config = { subtree: true, childList: true };

  observer.observe(document, config);
}

export function Notes() {
  const [db, setDb] = createSignal<IDBDatabase | null>(null);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  const [notes, setNotes] = createSignal<Note[]>([]);
  const [count, setCount] = createSignal<number>(0);

  const loadNotes = async (db: IDBDatabase) => {
    setIsLoading(true);

    const notes = await notesRepository.get(
      db,
      extractUsername(window.location.href)
    );

    setNotes(notes);
    setIsLoading(false);
  };

  const checkConstraints = async (db: IDBDatabase) => {
    const count = await notesRepository.count(db);

    setCount(count);
  };

  createEffect(async () => {
    const db = await openDb();

    setDb(db);

    await loadNotes(db);
    await checkConstraints(db);
  });

  const handleSave = async (note: Note) => {
    if (note.id === "-1") {
      note.id = uuidv4();
      note.username = extractUsername(window.location.href);

      setNotes([...notes(), note]);

      await notesRepository.insert(db()!, note);
      await checkConstraints(db()!);
    } else {
      notes().find((item) => item.id === note.id)!.text = note.text;

      setNotes([...notes()]);

      notesRepository.update(db()!, note);
    }
  };

  const handleDelete = async (id: string) => {
    setNotes([...notes().filter((item) => item.id !== id)]);

    await notesRepository.delete(db()!, id);
    await checkConstraints(db()!);
  };

  observerUrl(() => {
    loadNotes(db()!);
  });

  const disabled = () => {
    return count() >= COMMENTS_LIMIT;
  };

  return (
    <>
      <h2 class="lt-title">Notes</h2>
      <ul class="lt-notes">
        {isLoading() ? (
          <li class="lt-loading">Loading...</li>
        ) : (
          <>
            <For each={notes()}>
              {(note) => (
                <EditNote
                  note={note}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              )}
            </For>
            <EditNote disabled={disabled()} onSave={handleSave} />
          </>
        )}
      </ul>
    </>
  );
}
