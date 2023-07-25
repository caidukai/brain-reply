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
import { encode, decode } from 'js-base64';

interface DialogSetLicenseProps {
  onSetLicense: (key: string) => void,
  show: boolean,
  onShow: (show: boolean) => void,
}

const DialogSetLicense = (props: DialogSetLicenseProps) => {
  const [miyao, setMiyao] = useState('')
  const { enqueueSnackbar } = useSnackbar();
  const handleOpenAddKey = () => {
    props.onShow(!props.show)
  }
  const handleSave = () => {
    let val = _trim(miyao)
    props.onSetLicense(miyao)
    handleOpenAddKey()
    setLS('licensekey', val)
    enqueueSnackbar(decode('5r+A5rS756CBa2V55re75Yqg5oiQ5Yqf'));
  }
  const handleKeyChange = (e: any) => {
    setMiyao(e.target.value)
  }

  return (
    <>
      <Dialog
        open={props.show}
        onClose={handleOpenAddKey}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div>
            <div className="mt-2 text-gray-800 dark:text-white text-left text-sm">
              <h2 className="text-center text-xl font-bold">输入许可证key</h2>
              <p className="my-2 text-sm">
                输入 <b>Brain Reply 许可证key</b> 解锁更多高级功能
              </p>
              <div className="my-4 z-100 relative">
                <input
                  onChange={handleKeyChange}
                  type="text"
                  placeholder="Enter your license key here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"
                  defaultValue=""
                  tabIndex={0}
                />
              </div>
              <p className="my-2 text-sm">
                没有购买?{" "}
                <a className="text-blue-500 hover:underline" href="https://brainreply.lemonsqueezy.com/checkout/buy/1bc84253-1419-4789-8d25-91bc67ce71c2">
                  → 去购买
                </a>
              </p>
              <p className="my-2 text-sm">
                忘记许可证key? →{" "}
                <a
                  className="text-blue-500 hover:underline"
                  href="https://app.lemonsqueezy.com/my-orders/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  去订单中查找
                </a>
                或在邮箱中恢复
              </p>
              <div className="my-4 text-center flex items-center justify-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-1 disabled:bg-gray-500" onClick={handleSave}>
                  <span>激活许可证</span>
                </button>
              </div>
              <p className="my-2 text-xs text-center">
                Brain Reply将连接到服务器验证您的许可证key
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default DialogSetLicense