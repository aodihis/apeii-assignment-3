import { Agent, type AnyTool } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "./prompts";
import { getModel } from "./models.js";
import { createLoggerObserver } from "@anvia/logger";
import { logger } from "./logger";
import { memoryCompactor, memoryStore } from "./memory";

interface AgentOptions {
  modelId?: string;
  tools?: AnyTool[];
}

export const createAgent = (options: AgentOptions = {}) => {
  return new Agent({
    id: "assistant",
    model: getModel(options?.modelId),
    instructions: BASE_INSTRUCTIONS,
    memory: {
      store: memoryStore,
      savePolicy: "turn",
      compaction: {
        compactor: memoryCompactor,
        trigger: {afterTokens: 200_000}
      }
    },
    tools: options.tools ?? [],
    observability: {
      observers: { logger: createLoggerObserver({ logger }) },
    },
  });
};

