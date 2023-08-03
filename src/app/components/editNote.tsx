import { createSignal } from "solid-js";
import { Note } from "../types/note";
import { NoteStatus } from "../enums/noteStatus";

const INIT_NOTE = {
  id: "-1",
  text: "",
  status: NoteStatus.Nothing,
};

type Props = {
  note?: Note;
  onSave: (note: Note) => void;
};

export function EditNote({ note, onSave }: Props) {
  const editNote = note || INIT_NOTE;

  const handleKeyDown = (e: any) => {
    if (editNote.text == "" || (editNote.id == "-1" && e.key !== "Enter"))
      return;

    onSave({ ...editNote, text: e.target.value });

    e.target.value = "";
  };

  return (
    <li>
      <input value={editNote.text} onKeyDown={handleKeyDown} />
    </li>
  );
}
