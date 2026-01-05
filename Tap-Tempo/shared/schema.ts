import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  bpm: numeric("bpm", { precision: 5, scale: 1 }).notNull(), // e.g. 120.5
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({
  id: true,
  createdAt: true,
});

export type Measurement = typeof measurements.$inferSelect;
export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
