import { NoteStatus } from "../enums/noteStatus";

export type Note = {
  id: string;
  text: string;
  status: NoteStatus;
};
