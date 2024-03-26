import { z } from 'zod'

export const tokenValidator = z.object({
  token: z.string(),
  username: z.string(),
  sent_at: z.date(),
  expires_at: z.date(),
})

export type tokenDataType = z.infer<typeof tokenValidator>
