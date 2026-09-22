import { createTool } from "@anvia/core";
import { z } from "zod";
import type { INoteService } from "../service";

export interface NoteToolDependencies {
  service: INoteService;
}

export const createNoteTool = (deps: NoteToolDependencies) => {
  const addNoteTool = createTool({
    name: "addNote",
    description: "Use this tool to add a new note",
    inputSchema: z.object({
      note: z.string(),
    }),
    execute: ({ note }) => deps.service.createNote(note),
  });

  const readNoteTool = createTool({
    name: "readNote",
    description: "Use this tool to read one note or all notes",
    inputSchema: z.object({
      noteId: z.string().optional(),
    }),
    execute: ({ noteId }) =>
      noteId ? deps.service.getNote(noteId) : deps.service.getNotes(),
  });

  const updateNoteTool = createTool({
    name: "updateNote",
    description: "Use this tool to update an existing note",
    inputSchema: z.object({
      noteId: z.string(),
      note: z.string(),
    }),
    execute: ({ noteId, note }) => deps.service.updateNote(noteId, note),
  });

  const deleteNoteTool = createTool({
    name: "deleteNote",
    description: "Use this tool to delete an existing note",
    inputSchema: z.object({
      noteId: z.string(),
    }),
    execute: ({ noteId }) => deps.service.deleteNote(noteId),
  });

  return [addNoteTool, readNoteTool, updateNoteTool, deleteNoteTool];
};
