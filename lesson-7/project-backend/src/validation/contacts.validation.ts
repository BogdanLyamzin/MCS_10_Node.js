import {z} from "zod";

export const contactIdSchema = z.strictObject({
  id: z.coerce.number().int().positive()
})

export const createContactSchema = z.strictObject({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  phone: z.string().trim().min(11).max(15),
  isFavorite: z.boolean().optional()
});

export const updateContactSchema = createContactSchema.partial().refine(data =>  Object.keys(data).length > 0, {
  error: "Body must have at least one field"
});