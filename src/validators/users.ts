import { z } from 'zod'

export const userPostReqValidator = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string().email(),
    password: z.string(),
  })
  .strict()

export type userPostRequest = z.infer<typeof userPostReqValidator>

export const userPutReqValidator = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().optional(),
  })
  .strict()

export type userPutRequest = z.infer<typeof userPutReqValidator>

export const userResValidator = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  account_created: z.date(),
  account_updated: z.date(),
})

export type userResponse = z.infer<typeof userResValidator>
