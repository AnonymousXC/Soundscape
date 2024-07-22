"use client"
import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

function useSocket() {

    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const soc = io(process.env.NEXT_PUBLIC_CHAT_BACKEND_URL || '')
        soc.connect()
        soc.on('connect', () => {
            setSocket(soc)
        })
    }, [])

    return socket;
}

export default useSocket;