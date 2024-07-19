import "dotenv/config"
import express, { Request, Response } from "express"
import { createServer } from "http2";
import { Server, Socket } from "socket.io"


const app = express();
const server = createServer(app)
const io = new Server(server)

app.get('/', (req: Request, res: Response) => {
  res.send("Why are you here?")
})

io.on('connection', (socket : Socket) => {
  console.log(socket)
})

app.listen(process.env.PORT, () => {
  console.log("Listening on port : " + process.env.PORT)
})