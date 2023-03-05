import { router, t } from "./../trpc"
import { useRouter } from "./users"

export const appRouter = router({
  sayHi: t.procedure.query(() => {
    return "Hi"
  }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === "string") {
        return v
      }
      throw Error("Invalid Input: Expected string")
    })
    .mutation((req) => {
      console.log("Client Say:", req.input)
      return true
    }),
    users: useRouter
})
