import "dotenv/config"
import express, { Request, Response } from "express"
import { createServer } from "node:http";
import { Server, Socket } from "socket.io"
import cors from "cors"
import { MessageData } from "./@types/MessageData";


const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://soundscape-psi.vercel.app"],
  }
})


app.use(cors({
  origin: ["http://localhost:3000", "https://soundscape-psi.vercel.app"]
}));


app.get('/', (req: Request, res: Response) => {
  res.send("Why are you here?")
})


io.on('connection', (socket: Socket) => {
  socket.on("global-message-send", (data : MessageData) => {
    console.log(data)
    io.emit("global-receive-message", data)
  })
})


server.listen(process.env.PORT, () => {
  console.log("Listening on port : " + process.env.PORT)
})