import { Studio } from "@anvia/studio";
import { createAgent } from "./agents";
import { NoteService } from "./service";
import { createNoteTools } from "./tools/note-tools";
import { db } from "./utils/db";

const noteTools = createNoteTools({
  service: new NoteService(db.orm.public.Notes),
});

const agent = createAgent({
    tools: noteTools
})


const studio = new Studio([agent]).start();