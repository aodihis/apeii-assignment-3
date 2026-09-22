# Devscale AI Product Engineering: TypeScript IV

## Week 4 - Assignment 3

Assignment by Iqbal.

This assignment builds a simple note-management agent using TypeScript, Anvia Agent Core, Anvia Studio, PostgreSQL, Prisma, and an OpenAI-compatible language model API.

The agent can create, read, update, and delete notes. It also uses Prisma-backed memory with summary compaction enabled so that conversations can persist across turns without growing indefinitely.

## Requirements

- Node.js
- pnpm
- Docker and Docker Compose
- An OpenAI-compatible API key and base URL

## Assignment Requirements

This project satisfies the assignment requirements by:

- Creating a simple note-management agent.
- Providing five related note tools:
  - `addNote`
  - `readNote`
  - `readNotes`
  - `updateNote`
  - `deleteNote`
- Binding the agent to Anvia Studio.
- Using `PrismaMemoryStore` for persistent memory.
- Enabling summary-based memory compaction.

## Setup

Install dependencies:

```bash
pnpm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

Update `.env` with your model provider credentials:

```env
DATABASE_URL="postgresql://anvia:anvia@localhost:55532/anvia"
OPENAI_API_KEY=your-api-key
OPENAI_BASE_URL=your-openai-compatible-base-url
```

Start PostgreSQL and Adminer:

```bash
docker compose up -d
```

PostgreSQL is available at `localhost:55532`.

Adminer is available at:

```text
http://localhost:8085
```

Use the following values to connect through Adminer:

- System: PostgreSQL
- Server: `db` when connecting from the Docker network, or `localhost` from the host
- Username: `anvia`
- Password: `anvia`
- Database: `anvia`

## Run the Application

Start the agent and Studio:

```bash
pnpm dev
```

The application entry point is `src/index.ts`. It creates the note service, registers the note tools with the agent, and starts Anvia Studio with the agent.

## Available Tools

### Add a Note

`addNote` creates a new note.

The note is trimmed and must contain at least one character.

### Read One Note

`readNote` retrieves one note by its ID.

The response includes both the note ID and the note text.

### Read All Notes

`readNotes` retrieves all saved notes.

Each returned note includes its ID and text. If no notes exist, the agent reports that there are no notes saved.

### Update a Note

`updateNote` updates an existing note by its ID.

The replacement text is trimmed and must contain at least one character.

### Delete a Note

`deleteNote` deletes an existing note by its ID.

## Memory and Compaction

The agent uses `PrismaMemoryStore` from `@anvia/memory-prisma/v8` and stores memory in the configured PostgreSQL database.

Memory is saved after each turn. Summary compaction is enabled with a token threshold so older conversation history can be condensed when the context becomes large.

The configuration is defined in `src/agents.ts` and `src/memory.ts`.
