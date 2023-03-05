import express from "express"
import * as trpc from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import { publicProcedure, router, t } from "./trpc"
import cors from "cors"

const appRouter = router({
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
})

const app = express()
const port = 8080

const corsOpts = {
  origin: "http://localhost:3000",
  // methods: ["GET", "POST"],
  // allowedHeaders: ["Content-Type"],
}

app.use(cors(corsOpts))

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)

app.get("/", (req, res) => {
  res.send("Hello from api-server")
})

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`)
})

export type AppRouter = typeof appRouter
