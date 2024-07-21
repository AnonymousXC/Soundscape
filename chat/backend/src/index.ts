import "dotenv/config"
import express, { Request, Response } from "express"
import { createServer } from "node:http";
import { Server, Socket } from "socket.io"
import cors from "cors"


const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8081"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin:localhost:3000"]
  }
})

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send("Why are you here?")
})

io.on('connection', (socket: Socket) => {
  console.log(socket)
})

server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "localhost:3000");
  console.log(res)
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port : " + process.env.PORT)
})