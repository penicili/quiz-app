import "server-only";
import { z } from "zod";

export const env = z.object({
  MONGODB_URI: z.string().min(1),
  MONGODB_DB: z.string().min(1).default('deafult_db'),
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().min(1),
  GEMINI_LIVE_MODEL: z.string().min(1),
  APP_NAME: z.string().min(1),
}).parse(process.env);


