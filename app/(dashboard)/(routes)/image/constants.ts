//The code snippet you've provided is a use of the Zod library in JavaScript, 
//which is designed for schema validation. Zod is often used to validate data 
//structures, such as the shape and content of objects, arrays, strings, numbers, etc.

import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required"
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  }
  // {
  //   value: "2",
  //   label: "2 Photos"
  // },
  // {
  //   value: "3",
  //   label: "3 Photos"
  // },
  // {
  //   value: "4",
  //   label: "4 Photos"
  // },
  // {
  //   value: "5",
  //   label: "5 Photos"
  // }
];

export const resolutionOptions = [
  {
    value: "1024x1024",
    label: "1024x1024",
  },
  {
    value: "1024x1792",
    label: "1024x1792",
  },
  {
    value: "1792x1024",
    label: "1792x1024",
  },
];