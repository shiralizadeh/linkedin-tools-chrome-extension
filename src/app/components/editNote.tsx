import { createSignal } from "solid-js";
import { Note } from "../types/note";

const INIT_NOTE: Note = {
  id: "-1",
  username: "",
  text: "",
};

type Props = {
  disabled?: boolean;
  note?: Note;
  onSave: (note: Note) => void;
  onDelete?: (id: string) => void;
};

export function EditNote(props: Props) {
  const [editNote, setEditNote] = createSignal(props.note || INIT_NOTE);

  const handleKeyUp = (e: any) => {
    const updatedNote = {
      ...editNote(),
      text: e.target.value,
    };

    setEditNote(updatedNote);

    if (editNote().id == "-1") {
      if (e.key === "Enter" && e.target.value !== "") {
        props.onSave({ ...updatedNote });

        e.target.value = "";
      }
    } else {
      props.onSave({ ...updatedNote });
    }
  };

  const isEditing = editNote().id !== "-1";

  const handleDeleteClick = () => {
    props.onDelete && props.onDelete(editNote().id);
  };

  if (!isEditing) console.log({ props });

  return (
    <li
      class="lt-note"
      classList={{
        editing: isEditing,
      }}
    >
      <input
        tabIndex="0"
        disabled={props.disabled}
        class="lt-input"
        value={editNote().text}
        onKeyUp={props.disabled ? void 0 : handleKeyUp}
        placeholder={
          isEditing
            ? ""
            : props.disabled
            ? "You have reached free tier! (mohamad.shir@gmail.com)"
            : "Type & Press [Enter] to add a note..."
        }
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
