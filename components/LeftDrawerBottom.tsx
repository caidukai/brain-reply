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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FolderIcom from '@mui/icons-material/Folder';
import Divider from '@mui/material/Divider';
import Button from '@/components/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import MuiButton from '@mui/material/Button'
import { TanSvg } from "@/components/Svgs"
import _trim from 'lodash/trim'
import { useSnackbar } from 'notistack';
import { ChatssetType } from '@/interface/index'
import { ActionSetOpenAIkey, ActionShowOpenAIkey, ActionShowLicenseSet } from "@/redux/action/chat"
import DialogSetOpenApiKey from "@/components/DialogSetOpenApiKey"
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
interface LeftDrawerBottomProps {

  chatsset: ChatssetType,
  onshowOpenAISetApiKey: (show: boolean) => void
  onShowLicenseSet: (show: boolean) => void
}

const LeftDrawerBottom = (props: LeftDrawerBottomProps) => {
  const { chatsset, onshowOpenAISetApiKey
  } = props
  const { openaiKey, licensekey } = chatsset
  // const { enqueueSnackbar } = useSnackbar();
  const [openSendBack, setOpenSendBack] = useState(false)
  const [AddKeysOpen, setAddKeysOpen] = useState(false)
  // const [miyao, setMiyao] = useState('')
  // const handleSend = () => {
  //   setOpenSendBack(true)
  // }
  const handleCloseBack = () => {
    setOpenSendBack(false)
  }
  const handleOpenAddKey = () => {
    setAddKeysOpen(!AddKeysOpen)
  }
  // const handleSave = () => {
  //   let val = _trim(miyao)
  //   onSetOpenAiKey(val)
  //   handleOpenAddKey()
  //   enqueueSnackbar('key 添加成功');
  // }

  // const handleKeyChange = (e: any) => {
  //   setMiyao(e.target.value)
  // }
  const maskopenaiKey = openaiKey ? "*****" + openaiKey.substring(openaiKey.length - 3, openaiKey.length) : null
  const masklicensekey = licensekey ? "*****" + licensekey.substring(licensekey?.length - 3, licensekey.length) : null
  return (
    <>
      <div className="py-2 fixed w-72 left-0 bottom-0 px-2  text-white text-xs text-center bg-gray-700 font-bold">
        <div className="pb-2">
          <div className="flex items-center justify-center mb-2 font-bold">
            <span className="mr-2">授权码</span>
            {
              masklicensekey
                ? <Button className="py-1" onClick={() => props.onShowLicenseSet(true)}>
                  <span className="text-xs font-bold">{masklicensekey}</span>
                </Button>
                : <Button className="py-1" onClick={() => props.onShowLicenseSet(true)}>
                  <TanSvg />
                  <span className="text-xs font-bold">未添加</span>
                </Button>
            }
          </div>
          <div className="flex items-center justify-center font-bold">
            <span className="mr-2">OpenAI API Key</span>
            {maskopenaiKey
              ? <Button className="py-1" onClick={() => onshowOpenAISetApiKey(true)}>
                <span className="text-xs font-bold">{maskopenaiKey}</span>
              </Button>
              : <Button className="py-1" onClick={() => onshowOpenAISetApiKey(true)}>
                <TanSvg />
                <span className="text-xs font-bold">未添加</span>
              </Button>

            }
          </div>
        </div>
        <Divider />
        <p className="mt-2 text-gray-400">
          BrainReply.com © 2023
        </p>
        <div className="py-2 text-gray-400 flex items-center justify-center">
          <a className="text-xs" href="https://twitter.com/develop_atlas" target="_blank">Privacy/Terms</a>
          <a className="pl-1 text-xs" href="mailto:feedback@brainreply.com" target="_blank">提交反馈</a>
          <a className="pl-1 text-xs" href="https://twitter.com/develop_atlas" target="_blank">FAQs</a>
          <a className="pl-1  underline" href="https://twitter.com/develop_atlas" target="_blank">
            <TwitterIcon className="text-sm" fontSize="small" />
          </a>
          <a className="pl-1  underline" href="https://github.com/caidukai/brain-reply" target="_blank">
            <GitHubIcon className="text-sm" fontSize="small" />
          </a>
        </div>

        {/* <div className="flex items-center justify-center ">
          <Button onClick={handleSend}>
            <span className="text-xs"></span>
          </Button>
        </div> */}
      </div>
      <Dialog
        open={openSendBack}
        onClose={handleCloseBack}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          提交反馈？
        </DialogTitle>
        <DialogContent>
          欢迎提供反馈、建议、功能请求和错误报告！
          <div className="my-4 text-center"><a href="mailto:feedback@brainreply.com" className="text-blue-600 hover:underline">feedback@brainreply.com</a></div>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseBack}>
            关闭
          </MuiButton>
        </DialogActions>
      </Dialog>
      {/* <Dialog
        open={AddKeysOpen}
        onClose={handleOpenAddKey}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div>
            <div className="mt-2 text-gray-800 dark:text-white text-left text-sm">
              <h2 className="text-center text-xl font-bold">🔑 输入Open AI key :</h2>
              <div className="text-center my-4">
                <a
                  className="text-blue-500 text-xs hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://platform.openai.com/account/api-keys"
                  tabIndex={0}
                >
                  → 如何获取Openai API key ?
                </a>
              </div>
              <div className="text-xs">
                您的APIkey 存储在浏览器的本地，无需担心泄漏。
              </div>
              <div className="my-4">
                <input
                  type="text"
                  onChange={handleKeyChange}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"
                  autoComplete="off"
                />
              </div>
              <div className="my-4 text-center font-semibold">
                <details>
                  <summary className="my-4 cursor-pointer hover:underline">
                    APIkey 不工作？点击此处。
                  </summary>
                  <ul className="list-disc pl-4 text-left space-y-4">
                    <li>
                      请确保您已在{" "}
                      <a
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://platform.openai.com/account/billing/overview"
                      >
                        OpenAI Billing
                      </a>{" "}
                      页面中添加了支付信息. 如果没有支付信息，您的APIkey 将无法工作。.
                    </li>
                    <li>
                      OpenAI的ChatGPT APIkey 非常便宜。你为你的使用付费，{" "}
                      <a
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://openai.com/pricing#language-models"
                      >
                        价格
                      </a>{" "}
                      是每1美元10万个单词。
                    </li>
                    <li>不需要ChatGPT Plus订阅。</li>
                  </ul>
                </details>
              </div>
              <div className="my-2 text-center space-x-2 flex items-center justify-center">
                <button onClick={handleSave} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-1 disabled:bg-gray-400">
                  <span>保存APIkey </span>
                </button>
              </div>
              <div className="my-4 text-xs">
                应用程序将连接到OpenAI API服务器，以检查您的APIkey 是否工作正常。
              </div>
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleOpenAddKey}>
            关闭
          </MuiButton>
        </DialogActions>
      </Dialog> */}

    </>
  )
}
const mapStateToProps = (state: any) => {
  let { chatsset } = state
  return { chatsset }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onSetOpenAiKey: (key: string) => {
      dispatch(ActionSetOpenAIkey(key))
    },
    onshowOpenAISetApiKey: (show: boolean) => {
      dispatch(ActionShowOpenAIkey(show))
    },
    onShowLicenseSet: (show: boolean) => {
      dispatch(ActionShowLicenseSet(show))
    }
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(LeftDrawerBottom)
