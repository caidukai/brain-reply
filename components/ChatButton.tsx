/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useEffect, useRef, useState } from "react";
import SMSIcon from "@mui/icons-material/Sms"
import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from "@mui/material/Avatar"
import { messagesRoleType, messagesType, ChatssetType, ChatType } from '@/interface/index'
import cls from "clsx"
import LoadingDots from "./LoadingDots"
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setLS, getLS } from "@/utils/viewhelper"
interface ChatButtonProps {
  idx: number,
  item: ChatType,
  selected: boolean
  onChangeChat: (idx: number) => void
  onDeleteChat: (idx: number) => void
}

const ChatButton = ({ item, selected, onChangeChat, onDeleteChat, idx }: ChatButtonProps) => {
  const el = useRef(null)
  const { id, title, messages, isFetching } = item
  const desc = messages[messages.length - 1].content
  const [showDelete, setDelete] = useState(false)
  const handleChange = () => {
    onChangeChat(idx)
  }
  const handleDelete = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDelete(true)
    setTimeout(() => {
      setDelete(false)
    }, 2000)
  }
  const handleSureDelete = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    onDeleteChat(idx)
  }
  return (
    <div
      onClick={handleChange}
      role="button"
      tabIndex={0}
      aria-disabled="false"
      aria-roledescription="draggable"
      aria-describedby="DndDescribedBy-0"
      ref={el}
    >
      <div className="select-none lg:select-auto touch-manipulation">
        <div className={cls({ 'bg-gray-900': selected }, "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center text-sm font-medium w-full  justify-between overflow-hidden px-2 py-2")}>
          <Avatar className="w-10 h-10 rounded-md mr-2 z-10" variant="square">
            <SMSIcon />
          </Avatar>
          <div className="min-w-0 pr-18 text-left w-full">
            <div className="text-gray-100 truncate w-full">{title}</div>
            {isFetching
              ? <div className="text-xs text-gray-400 font-normal truncate  w-full mt-1">输入中 <LoadingDots color="white" style="large" /></div>
              : <div className="text-xs text-gray-400 font-normal truncate  w-full">
                {desc}
              </div>
            }
          </div>
          <div>
            {showDelete
              ? <div onClick={handleSureDelete} className="text-xs whitespace-nowrap underline text-red-900">确认？</div>
              : <IconButton onClick={handleDelete} color="secondary" size="small" >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default ChatButton