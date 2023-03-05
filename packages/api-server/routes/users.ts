import { z } from "zod"
import { router, t } from "./../trpc"
import { EventEmitter } from "stream"
import { observable } from "@trpc/server/observable"

const userProcedure = t.procedure.input(z.object({ userId: z.string() }))

const eventEmitter = new EventEmitter()

export const useRouter = router({
  get: userProcedure.query((req) => {
    return { id: req.input.userId }
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), id: z.string() }))
    .mutation((req) => {
      eventEmitter.emit("upadte", req.input.userId)
      console.log(
        `Update user name to ${req.input.name} and id of a client to ${req.input.userId}`,
        req.ctx.isAdmin
      )

      return { id: req.input.userId, name: req.input.name, password: "x" }
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("upadte", emit.next)

      return () => {
        eventEmitter.off("update", emit.next)
      }
    })
  }),
  // will not pass password x thens to output ^
})
