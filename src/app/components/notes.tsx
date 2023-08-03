import { For, createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { NoteStatus } from "../enums/noteStatus";
import { Note } from "../types/note";
import { EditNote } from "./editNote";

import "./notes.scss";

type Props = {};

export function Notes() {
  const [notes, setNotes] = createSignal<Note[]>([
    {
      id: uuidv4(),
      text: "He is cool!",
      status: NoteStatus.Nothing,
    },
    {
      id: uuidv4(),
      text: "AWESOME!",
      status: NoteStatus.Nothing,
    },
  ]);

  const handleSave = (note: Note) => {
    if (note.id === "-1") {
      note.id = uuidv4();

      setNotes([...notes(), note]);
    } else {
      notes().find((item) => item.id === note.id)!.text = note.text;

      setNotes([...notes()]);
    }
  };

  return (
    <>
      <ul class="lt-notes">
        <For each={notes()}>
          {(note) => <EditNote note={note} onSave={handleSave} />}
        </For>
        <EditNote onSave={handleSave} />
      </ul>
    </>
  );
}
