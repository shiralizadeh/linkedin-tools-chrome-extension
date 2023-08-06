import { createSignal } from "solid-js";
import { Note } from "../types/note";

const INIT_NOTE: Note = {
  id: "-1",
  username: "",
  text: "",
};

type Props = {
  note?: Note;
  onSave: (note: Note) => void;
  onDelete?: (id: string) => void;
};

export function EditNote({ note, onSave, onDelete }: Props) {
  const [editNote, setEditNote] = createSignal(note || INIT_NOTE);

  const handleKeyUp = (e: any) => {
    const updatedNote = {
      ...editNote(),
      text: e.target.value,
    };

    setEditNote(updatedNote);

    if (editNote().id == "-1") {
      if (e.key === "Enter" && e.target.value !== "") {
        onSave({ ...updatedNote });

        e.target.value = "";
      }
    } else {
      onSave({ ...updatedNote });
    }
  };

  const isEditing = editNote().id !== "-1";

  const handleDeleteClick = () => {
    onDelete && onDelete(editNote().id);
  };

  return (
    <li
      class="lt-note"
      classList={{
        editing: isEditing,
      }}
    >
      <input
        tabIndex="0"
        class="lt-input"
        value={editNote().text}
        onKeyUp={handleKeyUp}
        placeholder={isEditing ? "" : "Type & Press [Enter] to add a note..."}
      />
      {isEditing && (
        <img
          tabIndex="1"
          class="lt-delete"
          src={chrome.runtime.getURL("assets/delete.png")}
          alt="Delete"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}
