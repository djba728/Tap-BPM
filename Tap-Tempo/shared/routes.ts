import { z } from "zod";
import { insertMeasurementSchema, measurements } from "./schema";

export const api = {
  measurements: {
    list: {
      method: "GET" as const,
      path: "/api/measurements",
      responses: {
        200: z.array(z.custom<typeof measurements.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/measurements",
      input: insertMeasurementSchema,
      responses: {
        201: z.custom<typeof measurements.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    clear: {
      method: "DELETE" as const,
      path: "/api/measurements",
      responses: {
        204: z.void(),
      },
    },
  },
};
