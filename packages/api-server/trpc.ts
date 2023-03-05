import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server"
import { createContext } from "./context"
// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

const isAdminMiddlewhere = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  // ovveride ctx for uathenticate use
  return next({ ctx: { user: { id: 1 } } })
})

// add middlewhere
export const adminProcedure = t.procedure.use(isAdminMiddlewhere)

