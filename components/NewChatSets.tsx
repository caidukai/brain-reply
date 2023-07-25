/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React from "react"
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Vip, GreenSvg, YaoShiSvg } from "@/components/Svgs"
import { ActionShowNewChatModel } from "@/redux/action/chat"
import { messagesType, ChatssetType, ChatType, aimodeKeys, aimodeValus, aimodeLabel } from '@/interface/index'
import SettingsIcon from "@mui/icons-material/Settings"
import BookIcon from "@mui/icons-material/Book"

interface NewChatSetsProps {
  newchat: ChatType,
  chatsset: ChatssetType,
  onShowNewchatMode: (show: boolean) => void
}

const NewChatSets = (props: NewChatSetsProps) => {
  const { aimodeKey } = props.newchat
  const show = props.chatsset.selected == null
  return (
    <>
      {show && <div className="my-4 text-center flex items-center justify-center flex-wrap gap-2 px-4">
        <button onClick={() => props.onShowNewchatMode(true)} className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md text-white bg-gradient-to-r from-green-500 to-cyan-500 transition-all active:bg-cyan-600 group space-x-2">
          <SettingsIcon className="mr-1" />模型: {aimodeLabel[aimodeKey]}
        </button>
        {/* <button className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md bg-indigo-600 text-white hover:bg-indigo-500 transition-all active:bg-indigo-600 group space-x-2">
        <BookIcon className="mr-1" /> 提示词
      </button> */}
      </div>}
    </>
  )
}

const mapStateToProps = (state: any) => {
  const { chats, chatsset, newchat } = state

  return { chats, chatsset, newchat }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onShowNewchatMode: (show: boolean) => {
      dispatch(ActionShowNewChatModel(show))
    }
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(NewChatSets)
