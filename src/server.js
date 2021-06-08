import express from "express"
import listEndpoints from "express-list-endpoints"

import blogsRoute from "./services/blogs/index.js"
import authorsRoute from "./services/authors/index.js"

const { PORT } = process.env

const server = express()

server.use(express.json())

server.use("/blog", blogsRoute)
server.use("/author", authorsRoute)

server.listen(PORT, () => {
    console.table(listEndpoints(server))
    console.log("server is running on port ", PORT)
})
