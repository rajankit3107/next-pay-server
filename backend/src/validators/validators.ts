import z from "zod";

export const signupBody = z.object({
  username: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
