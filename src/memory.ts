import { PrismaMemoryStore } from "@anvia/memory-prisma/v8";
import { db } from "../prisma/db";
import { createSummaryMemoryCompactor } from "@anvia/core";
import { getModel } from "./models";

export const memoryStore = new PrismaMemoryStore({
  client: db,
});

export const memoryCompactor = createSummaryMemoryCompactor({
    model: getModel()
})