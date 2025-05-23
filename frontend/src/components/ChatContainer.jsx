import React, { useEffect, useRef } from 'react';
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from '../store/userAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
function ChatContainer() {
  const { messages, getMessages, isMessagesLoading,selectedUser} = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef();
  useEffect(()=>{
   getMessages(selectedUser._id);
   console.log(messages)
  },[selectedUser._id,getMessages])

  if(isMessagesLoading){ return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )}
  return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          ref={messageEndRef}
        >
          <div className='chat-image avatar'>
            <div className="size-10 rounded-full bordered">
              <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profilePic" />
            </div>
          </div>
          <div className='chat-header mb-1'>
            <time className="text-xs opacity-50 ml-1">{message.createdAt}</time>
          </div>
          <div className='chat-bubble flex'>
            {message.image && (
              <img src={message.image} alt='Attachment' className='sm:max-w-[200px] rounded-md mb-2'/>
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
        </div>
        <MessageInput />
      </div>
  )
}

export default ChatContainer
