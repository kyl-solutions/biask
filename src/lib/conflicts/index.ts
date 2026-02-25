import { conflict as israelPalestine } from "./israel-palestine";
import { conflict as ukraine } from "./ukraine";
import { conflict as january6 } from "./january-6";
import type { Beat, ConflictMeta } from "../types";

export interface ConflictData {
  meta: ConflictMeta;
  beats: Beat[];
}

// Registry will grow as new conflicts are added
const conflicts: Record<string, ConflictData> = {
  "israel-palestine": israelPalestine,
  "ukraine": ukraine,
  "january-6": january6,
};

export function getConflict(id: string): ConflictData | undefined {
  return conflicts[id];
}

export function getAllConflictIds(): string[] {
  return Object.keys(conflicts);
}

export function getAllConflicts(): Array<{ id: string; meta: ConflictMeta }> {
  return Object.entries(conflicts).map(([id, data]) => ({
    id,
    meta: data.meta,
  }));
}
