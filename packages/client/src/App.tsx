import React from "react"
import ReactDOM from "react-dom"

import "./index.scss"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { AppRouter } from "./../../api-server/index"

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:8080/trpc" })],
})

function start() {
  const result = client.sayHi.query()
  client.sayHi.query()
  client.sayHi.query()
  console.log(result)
}

function stop() {
  client.logToServer.mutate("Hi From Client side ")
}

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div onClick={start}>Hi: client</div>
    <div onClick={stop}>Mutation Hi client</div>
  </div>
)
ReactDOM.render(<App />, document.getElementById("app"))
