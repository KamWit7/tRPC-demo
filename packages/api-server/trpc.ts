import { initTRPC } from "@trpc/server"
// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC.create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
