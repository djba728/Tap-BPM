import { db } from "./db";
import { measurements, type Measurement, type InsertMeasurement } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  getMeasurements(): Promise<Measurement[]>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
  clearMeasurements(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getMeasurements(): Promise<Measurement[]> {
    return await db.select().from(measurements).orderBy(desc(measurements.createdAt)).limit(10);
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const [measurement] = await db
      .insert(measurements)
      .values(insertMeasurement)
      .returning();
    return measurement;
  }

  async clearMeasurements(): Promise<void> {
    await db.delete(measurements);
  }
}

export const storage = new DatabaseStorage();
