import z from "zod";

export const signupBody = z.object({
  username: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

export const signin = z.object({
  username: z.email(),
  password: z.string(),
});
