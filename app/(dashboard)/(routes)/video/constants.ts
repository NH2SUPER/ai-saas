//The code snippet you've provided is a use of the Zod library in JavaScript, 
//which is designed for schema validation. Zod is often used to validate data 
//structures, such as the shape and content of objects, arrays, strings, numbers, etc.

import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Video Prompt is required."
  }),
});