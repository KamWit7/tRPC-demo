import React from "react"
import ReactDOM from "react-dom"

import "./index.scss"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { AppRouter } from "./../../api-server/index"

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:8080/trpc" })],
})

async function start() {
  const result = await client.sayHi.query()
  console.log(result)
}

async function logToServer() {
  client.logToServer.mutate("Hi From Client side ")
}
async function users() {
  const users = await client.users.getUser.query()
  console.log(users)
}

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div onClick={start}>Hey Hi</div>
    <div onClick={logToServer}>Log to Server</div>
    <div onClick={users}>get users</div>
  </div>
)
ReactDOM.render(<App />, document.getElementById("app"))
