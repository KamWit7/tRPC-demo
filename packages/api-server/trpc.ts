import { inferAsyncReturnType, initTRPC } from "@trpc/server"
import { createContext } from "./context"
// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
