import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.measurements.list.path, async (req, res) => {
    const measurements = await storage.getMeasurements();
    res.json(measurements);
  });

  app.post(api.measurements.create.path, async (req, res) => {
    try {
      const input = api.measurements.create.input.parse(req.body);
      const measurement = await storage.createMeasurement(input);
      res.status(201).json(measurement);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.delete(api.measurements.clear.path, async (req, res) => {
    await storage.clearMeasurements();
    res.sendStatus(204);
  });

  // Seed data
  const existing = await storage.getMeasurements();
  if (existing.length === 0) {
    await storage.createMeasurement({ bpm: "120.0" });
    await storage.createMeasurement({ bpm: "95.5" });
  }

  return httpServer;
}
