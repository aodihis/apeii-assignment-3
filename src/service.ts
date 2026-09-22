import type { Models } from "../prisma/contract.d";

export type Note = Models.public_Notes;

export interface NoteQuery {
  first(): Promise<Note | null>;
  update(data: { note: string }): Promise<Note | null>;
  delete(): Promise<Note | null>;
}

export interface NoteStore {
  create(data: { note: string }): Promise<Note>;
  where(filter: { id: string }): NoteQuery;
  all(): PromiseLike<Note[]>;
}

export interface INoteService {
  createNote(note: string): Promise<Note>;
  getNote(noteId: string): Promise<Note | null>;
  getNotes(): Promise<Note[]>;
  updateNote(noteId: string, note: string): Promise<Note | null>;
  deleteNote(noteId: string): Promise<Note | null>;
}

export class NoteService implements INoteService {
  public constructor(private readonly notes: NoteStore) {}

  public createNote(note: string): Promise<Note> {
    return this.notes.create({ note });
  }

  public getNote(noteId: string): Promise<Note | null> {
    return this.notes.where({ id: noteId }).first();
  }

  public async getNotes(): Promise<Note[]> {
    return this.notes.all();
  }

  public updateNote(noteId: string, note: string): Promise<Note | null> {
    return this.notes.where({ id: noteId }).update({ note });
  }

  public deleteNote(noteId: string): Promise<Note | null> {
    return this.notes.where({ id: noteId }).delete();
  }
}
