/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import MuiButton from '@mui/material/Button'
import { TanSvg } from "@/components/Svgs"
import _trim from 'lodash/trim'
import { useSnackbar } from 'notistack';
import { setLS } from '@/utils/viewhelper'

interface DialogSetOpenApiKeyProps {
  onSetOpenAiKey: (key: string) => void,
  show: boolean,
  onShow: (show: boolean) => void,
}

const DialogSetOpenApiKey = (props: DialogSetOpenApiKeyProps) => {
  // const [AddKeysOpen, setAddKeysOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [miyao, setMiyao] = useState('')
  const handleOpenAddKey = () => {
    props.onShow(!props.show)
  }
  const handleSave = () => {
    let val = _trim(miyao)
    props.onSetOpenAiKey(val)
    handleOpenAddKey()
    setLS('openaikey', val)
    enqueueSnackbar('key 添加成功');
  }
  const handleKeyChange = (e: any) => {
    setMiyao(e.target.value)
  }
  // console.log(children)
  // const CH = children
  return (
    <>
      {/* {React.cloneElement(props.children, {
        onClick: handleOpenAddKey
      })} */}
      {/* <props.children onClick={handleOpenAddKey} /> */}
      <Dialog
        open={props.show}
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
              <div className="text-center ">
                <span className="text-red-500 text-xs">没有账号？点击下方链接直接前往购买</span>
                <div>
                  <a className="text-blue-500 text-xs hover:underline" href="https://brainreply.lemonsqueezy.com/checkout/buy/a0db2e52-5351-4199-a653-3bfab1e96bd7">直接购买账号</a>
                  {' '}
                  <a className="text-blue-500 text-xs hover:underline" href="https://brainreply.lemonsqueezy.com/checkout/buy/ae1d703c-0a1b-4673-a419-80eb07070196">尝鲜测试key</a>
                </div>
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
      </Dialog>
    </>
  )
}

export default DialogSetOpenApiKey