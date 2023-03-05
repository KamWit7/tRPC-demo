import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { applyWSSHandler } from "@trpc/server/adapters/ws"
import cors from "cors"
import { appRouter } from "./routes"
import { createContext } from "./context"
import ws from "ws"

const app = express()
const port = 8080
const corsOpts = {
  origin: "http://localhost:3000",
}

app.use(cors(corsOpts))

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    // router: mergetRouters,
    router: appRouter,
    createContext: createContext,
  })
)

app.get("/", (req, res) => {
  res.send("Hello from api-server")
})

const server = app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`)
})

// createContext - don't have res i req (websocet)
applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext,
})

export type AppRouter = typeof appRouter
