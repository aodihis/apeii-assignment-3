import { createTool } from "@anvia/core";
import { z } from "zod";
import type { INoteService } from "../service";

export interface NoteToolDependencies {
  service: INoteService;
}

const formatNote = (note: Awaited<ReturnType<INoteService["getNote"]>>) =>
  note ? `Note ID: ${note.id}\nNote: ${note.note}` : "There are no notes saved.";

const formatNotes = (notes: Awaited<ReturnType<INoteService["getNotes"]>>) =>
  notes.length
    ? notes.map((note) => formatNote(note)).join("\n\n")
    : "There are no notes saved.";

const formatError = (error: unknown) => {
  if (error instanceof Error && error.message === "Note not found.") {
    return "There are no notes saved.";
  }

  return `Error: ${error instanceof Error ? error.message : "Unable to complete the note operation."}`;
};

export const createNoteTools = (deps: NoteToolDependencies) => {
  const addNoteTool = createTool({
    name: "addNote",
    description: "Use this tool to add a new note",
    inputSchema: z.object({
      note: z.string().trim().min(1),
    }),
    execute: async ({ note }) => {
      try {
        return formatNote(await deps.service.createNote(note));
      } catch (error) {
        return formatError(error);
      }
    },
  });

  const readNoteTool = createTool({
    name: "readNote",
    description: "Use this tool to read one note by its note ID. Returns the note ID and text.",
    inputSchema: z.object({
      noteId: z.string().trim().min(1),
    }),
    execute: async ({ noteId }) => {
      try {
        return formatNote(await deps.service.getNote(noteId));
      } catch (error) {
        return formatError(error);
      }
    },
  });

  const readNotesTool = createTool({
    name: "readNotes",
    description: "Use this tool to read all saved notes. Returns each note's ID and text.",
    inputSchema: z.object({}),
    execute: async () => {
      try {
        return formatNotes(await deps.service.getNotes());
      } catch (error) {
        return formatError(error);
      }
    },
  });

  const updateNoteTool = createTool({
    name: "updateNote",
    description: "Use this tool to update an existing note",
    inputSchema: z.object({
      noteId: z.string(),
      note: z.string().trim().min(1),
    }),
    execute: async ({ noteId, note }) => {
      try {
        return formatNote(await deps.service.updateNote(noteId, note));
      } catch (error) {
        return formatError(error);
      }
    },
  });

  const deleteNoteTool = createTool({
    name: "deleteNote",
    description: "Use this tool to delete an existing note",
    inputSchema: z.object({
      noteId: z.string(),
    }),
    execute: async ({ noteId }) => {
      try {
        return formatNote(await deps.service.deleteNote(noteId));
      } catch (error) {
        return formatError(error);
      }
    },
  });

  return [addNoteTool, readNoteTool, readNotesTool, updateNoteTool, deleteNoteTool];
};
