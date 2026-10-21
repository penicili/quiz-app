import { z } from "zod";

export const createQuizSchema = z.object({
  questions: z
    .array(
      z.object({
        text: z.string().trim().min(1),
        answers: z
          .array( 
            z.object({
              text: z.string().trim().min(1),
              isCorrect: z.boolean(),
            }),
          )
          .min(2),
      }),
    )
    .min(1),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
