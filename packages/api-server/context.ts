import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

export function createContext({ req, res }: CreateExpressContextOptions) {
  return { isAdmin: true, req, res }
}
