import { z } from "zod";

const loginUserValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    }),
    password: z.string({
      required_error: "PASSWORD is required",
      invalid_type_error: "PASSWORD must be a string",
    })
  })
})

export const AuthValidation = {
  loginUserValidationSchema
}
