/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Vip, GreenSvg, YaoShiSvg } from "@/components/Svgs"
import { ActionShowOpenAIkey, ActionShowPre } from "@/redux/action/chat"
import { messagesRoleType, messagesType, ChatssetType, ChatType } from '@/interface/index'
import NewChatSets from "@/components/NewChatSets"
interface WelcomeMainProps {
  chatsset: ChatssetType
  onShowOpenAiKey: (show: boolean) => void
  onShowPre: (show: boolean) => void
}
const WelcomeMain = (props: WelcomeMainProps) => {
  const featList = [
    {
      label: "聊天记录搜索"
    },
    {
      label: "超多提示语料"
    },
    {
      label: "持续接入"
    },
    {
      label: "浏览器上本地运行，保护隐私"
    },
    {
      label: "无需登录"
    },
    {
      label: "使用您自己的 API key "
    },
    {
      label: "无月费"
    }
  ]

  return (
    <>
      <div className="p-6 sm:p-10 flex items-center justify-center">
        <div>
          <a href='https://brainreply.com/'>
            <div className="flex items-center justify-center space-x-2">
              <img src="https://pic.imgdb.cn/item/64115338ebf10e5d53b24e02.png" alt="Brain Reply" className="rounded-lg w-12 h-12" />
              <div className="font-semibold text-4xl sm:text-5xl text-black dark:text-white ">
                Brain<span className="text-blue-500">Reply</span>
              </div>
              <span className="bg-gradient-to-r from-green-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white text-center rounded-full inline-block ">
                GPT-4 支持!
              </span>
            </div>
          </a>
          <div className="text-center my-4 font-light text-base sm:text-xl my-4 sm:my-6 text-black dark:text-white">
            更优雅的ChatGPT客户端
          </div>
          <div className="flex items-center justify-center">
            <div className="my-2 grid sm:grid-cols-2 gap-y-2 gap-x-6">
              {featList.map((item, idx) => {
                return (
                  <div className="flex items-center justify-start space-x-1" key={idx}>
                    <GreenSvg />
                    <div className="text-sm">{item.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => props.onShowPre(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border-gray-500 border dark:hover:bg-zinc-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-2 space-x-2 text-sm"
            >
              <Vip />
              <span>查看高级更多功能</span>
            </button>
          </div>
          {!props.chatsset.openaiKey && <div className=" mt-10 ">
            <div className="text-sm mt-10 text-center space-y-4">
              <div>
                <div className='font-bold'>请在下方输入您的OpenAI API key，开始AI之旅吧</div>
                <div className="text-xs">
                  您的 API key 存储在本地浏览器上，不会发送到其他任何地方。
                </div>
              </div>
              <div>
                <button
                  onClick={() => props.onShowOpenAiKey(true)}
                  id="enter-api-key-btn"
                  className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm shadow-md bg-blue-600 text-white hover:bg-blue-500 transition-all active:bg-blue-600 group font-semibold text-sm disabled:bg-gray-400 space-x-2"
                >
                  <YaoShiSvg />
                  <span>输入您的OpenAI API key</span>
                </button>
              </div>
              <div className="text-center">
                <a
                  className="text-blue-500 text-xs hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://platform.openai.com/account/api-keys"
                >
                  → 在Open AI官网，获取您的API key
                </a>
              </div>
            </div>
          </div>}
        </div>
      </div>
      <NewChatSets />
    </>
  )
}
const mapStateToProps = (state: any) => {
  const { chats, chatsset, newchat } = state

  return { chats, chatsset, newchat }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onShowOpenAiKey: (show: boolean) => {
      dispatch(ActionShowOpenAIkey(show))
    },
    onShowPre: (show: boolean) => {
      dispatch(ActionShowPre(show))
    },

  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(WelcomeMain)
