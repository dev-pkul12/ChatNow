import React from 'react';
import { useState, useEffect } from 'react'
import socket from './io'

function ChatBox() {

    const [inputField, setInputField] = useState({
        name: "",
        room: "",
        message: ""
    })

    const [isChat, setIsChat] = useState(false)
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on('receave_message', (data) => {
            setMessageList([...messageList, data])
        })
    })

    const inpitHandler = (e) => {
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value
        })
    }

    const enterRoom = () => {

        setIsChat(true)
        socket.emit('join_room', inputField.room)
    }
    const sendMessage = async () => {
       
        await socket.emit('send_message', inputField)
        setMessageList([...messageList, inputField])
    }

    return (
        <div>
            <h1>FullStack Chat App</h1>
            {
                !isChat ? (<div>
                    <input type='text' placeholder='Enter name' name='name' onChange={inpitHandler} /> <br />
                    <input type='text' placeholder='Enter room' name='room' onChange={inpitHandler} /> <br />
                    <button onClick={enterRoom}>Enter Chat Room</button>
                </div>) : (
                    <div>
                        <h1> Chat Room </h1>
                        {
                            messageList.map((item, index) => {
                                return <div key={index}>
                                    {item.name}:{item.message}
                                </div>

                            })
                        }
                        <input type='text' placeholder='Enter message' name='message' onChange={inpitHandler} />
                        <button onClick={sendMessage}>Send Message</button>
                    </div>
                )
            }

        </div>
    )
}

export default ChatBox
