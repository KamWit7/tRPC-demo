import React from "react"
import ReactDOM from "react-dom"

import "./index.scss"
import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
  splitLink,
} from "@trpc/client"
import { AppRouter } from "./../../api-server/index"

const client = createTRPCProxyClient<AppRouter>({
  links: [
    // loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === "subscription"
      },
      true: wsLink({
        client: createWSClient({
          url: "ws://localhost:8080/trpc",
        }),
      }),
      false: httpBatchLink({
        url: "http://localhost:8080/trpc",
        headers: { Authorization: "TOKEN" },
      }),
    }),

    // httpBatchLink -> must be last!
  ],
})

async function start() {
  const result = await client.sayHi.query()
  console.log(result)
}

async function logToServer() {
  client.logToServer.mutate("Hi From Client side ")
}

async function users() {
  const users = await client.users.get.query({
    userId: "zxc_zxc",
  })
  console.log(users)
}

async function userUpadte() {
  const users = await client.users.update.mutate({
    userId: "asd_asd",
    name: "Kamil",
  })
  console.log(users)
}

async function secretAdmin() {
  const users = await client.secretData.query()
  console.log(users)
}

async function webSoccet() {
  const users = await client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log("Update", id)
    },
  })
  console.log(users)
}

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div onClick={start}>Hey Hi</div>
    <div onClick={logToServer}>Log to Server</div>
    <div onClick={users}>get users</div>
    <div onClick={userUpadte}>upadte user</div>
    <div onClick={secretAdmin}>secret admin login</div>
    <div onClick={webSoccet}>Update sub</div>
  </div>
)
ReactDOM.render(<App />, document.getElementById("app"))
