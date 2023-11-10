'use client'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const page = () => {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_KEY as string)
    socket.on('server:receive-trip', (info: any) => {
      console.log(info)
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  return <div>Holaaaaaaaaaaaaaaaaaaaa</div>
}

export default page
