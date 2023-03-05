import { z } from "zod"
import { router, t } from "./../trpc"

const userProcedure = t.procedure.input(z.object({ userId: z.string() }))

export const useRouter = router({
  get: userProcedure.query((req) => {
    return { id: req.input.userId }
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), id: z.string() }))
    .mutation((req) => {
      console.log(
        `Update user name to ${req.input.name} and id of a client to ${req.input.userId}`
      )
      return { id: req.input.userId, name: req.input.name, password: "x" }
    }),
  
// will not pass password x thens to output ^
})
