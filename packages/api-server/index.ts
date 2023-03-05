import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import cors from "cors"
import { appRouter } from "./routes"

const app = express()
const port = 8080
const corsOpts = {
  origin: "http://localhost:3000",
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
