/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useState } from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { connect, } from 'react-redux'
import { Dispatch, } from 'redux'
import { SoundedSvg } from "@/components/Svgs"
import _ from 'lodash'
import { getUTC } from "@/utils/viewhelper"
import { ActionInitChat, ActionSendUserMessgae, ActionGetBrainReply, ActionShowOpenAIkey } from "@/redux/action/chat"
import { messagesRoleType, messagesType, ChatssetType, ChatType } from '@/interface/index'
import { generateUUID } from "@/utils/viewhelper"
import { useSnackbar } from 'notistack';


interface BottomEntryProps {
  chat: ChatType,
  chatsset: ChatssetType,
  initChat: (chat: ChatType) => void,
  sendMessgae: (idx: number, msg: messagesType) => void,
  // pushNewChatMessgae: (msg: messagesType) => void,
  onGetBrainReply: (idx: number) => void,
  onShowOpenAiKey: (show: boolean) => void
}
const BottomEntry = ({ chat, chatsset, initChat, sendMessgae, onGetBrainReply, onShowOpenAiKey }: BottomEntryProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { id = null, } = chat
  const [txt, setTxt] = useState<string>('')
  const handleChange = (e: any) => {
    setTxt(e.target.value)
  }

  const handleKeyDown = (e: any) => {
    if (!e.shiftKey && e.keyCode == 13) {
      e.cancelBubble = true;
      e.preventDefault();
      e.stopPropagation();
      if (!_.trim(txt)) {
        enqueueSnackbar('请输入消息');
        return
      }
      if (!chatsset.openaiKey) {
        onShowOpenAiKey(true)
        return
      }

      setTxt('')
      let msg: messagesType = { role: messagesRoleType.user, content: _.trim(txt), c_at: getUTC() }
      if (!id) {
        initChat({ id: generateUUID(), ...chat, messages: [...chat.messages, msg] })

        return
      }
      sendMessgae(chatsset.selected as any, msg)
      onGetBrainReply(chatsset.selected as any)
    }
  }
  return (
    <div className="fixed z-20 bottom-0 left-0 right-0 sm:pl-72 ">
      <div className="mx-auto w-full hide-when-print transition-all max-w-3xl">
        <div className="px-4 pb-4 pt-0 bg-white dark:bg-zinc-800 px-4 transition-colors">
          <div className="pb-safe">
            <div className="flex items-end justify-center space-x-2 mb-2">
              <TextareaAutosize
                onKeyDown={handleKeyDown}
                value={txt}
                onChange={handleChange}
                className="w-full p-2 resize-none border rounded-md"
                aria-label="请在此输入..."
                placeholder="请在此输入..."
                nonce={''}
                onResize={() => { }}
                onResizeCapture={() => { }}
              />
              <button
                disabled
                className="cursor-pointer rounded-full bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 p-2 flex items-center justify-center transition-all hover:bg-gray-200 space-x-2 shrink-0"
                style={{ height: 42, width: 42 }}
              >
                <SoundedSvg />
              </button>
            </div>
            <div className="text-gray-400 text-xs text-center">
              <a href='https://brainreply.com'>BrainReply.com</a> - 更优雅的ChatGPT客户端
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


const mapStateToProps = (state: any) => {
  const { chats, chatsset, newchat } = state
  const chat = chatsset.selected != null ? chats[chatsset.selected] : newchat
  // console.log(chat, chatsset.selected)
  return { chat: chat, chatsset }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    initChat: (chat: ChatType) => {
      dispatch(ActionInitChat(chat))
    },
    sendMessgae: (idx: number, msg: messagesType) => {
      dispatch(ActionSendUserMessgae({ idx, ...msg }))
    },
    onGetBrainReply: (idx: number) => {
      dispatch(ActionGetBrainReply(idx))
    },
    onShowOpenAiKey: (show: boolean) => {
      dispatch(ActionShowOpenAIkey(show))
    },
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(BottomEntry)
