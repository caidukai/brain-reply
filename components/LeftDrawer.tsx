/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useState } from "react"
import MessageIcon from '@mui/icons-material/Message';
import Button from '@/components/Button'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ChatButton from "@/components/ChatButton"
import { ChatssetType, ChatType } from '@/interface/index'
import LeftDrawerBottom from "@/components/LeftDrawerBottom"
import typeenums from "@/redux/action/typeenums"
import Setting from "./Setting"
import SearchChats from "@/components/SearchChats"

interface LeftDrawerProps {
  // mobileOpen: boolean,
  chats: ChatType[],
  chatsset: ChatssetType,
  onNewChat: () => void,
  onChangeChat: (idx: number) => void,
  onDeleteChat: (idx: number) => void,
}
const LeftDrawer = ({ chats, chatsset, onNewChat, onChangeChat, onDeleteChat }: LeftDrawerProps) => {

  return (
    <>

      <div className="py-2 fixed left-0 top-0 w-72 px-2 bg-gray-700 z-20">
        <div className="mb-2 flex">
          <Button className="w-full mr-2" onClick={onNewChat}>
            <MessageIcon className="mr-2" />
            <span>新会话</span>
          </Button>
          <Setting />
        </div>
        <SearchChats />
        {/* <div className="flex">
          <input className="bg-gray-800 text-white px-2 py-1 rounded-md w-full mr-2" placeholder='搜索会话' />
          <Button className="w-16 bg-gray-800"><FolderIcom /></Button>
        </div> */}
      </div>
      <div className="" style={{ paddingTop: "96px", paddingBottom: "185px" }}>
        {chats.map((it, idx) => (<ChatButton onDeleteChat={onDeleteChat} idx={idx} onChangeChat={onChangeChat} selected={chatsset.selected === idx} item={it} key={idx} />))}
      </div>
      <LeftDrawerBottom />
    </>
  )
}
const mapStateToProps = (state: any) => {
  const { chats, chatsset } = state
  return { chats, chatsset }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onNewChat: () => {
      dispatch({ type: typeenums.CHANGE_CHAT, payload: null })
    },
    onChangeChat: (idx: number) => {
      dispatch({ type: typeenums.CHANGE_CHAT, payload: idx })
    },
    onDeleteChat: (idx: number) => {
      dispatch({ type: typeenums.CHANGE_CHAT, payload: null })
      dispatch({ type: typeenums.DELETE_CHAT, payload: idx })
    },
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(LeftDrawer)