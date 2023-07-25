/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React from 'react'
import Dialog from '@mui/material/Dialog'
import MuiButton from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Vip, } from "@/components/Svgs"
import VipEquity from '@/components/VipEquity'

interface DialogPreProps {
  show: boolean,
  onShow: (show: boolean) => void,
}

const DialogPre = (props: DialogPreProps) => {
  const handleOpenAddKey = () => {
    props.onShow(!props.show)
  }
  return (

    <Dialog
      open={props.show}
      onClose={handleOpenAddKey}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div className="mt-2 text-gray-800 dark:text-white text-center text-sm">
          <h2 className="text-center text-xl font-bold flex justify-center text-nowrap"><Vip /> 一次性购买，永久使用</h2>
          <div className='mt-4'>
            <VipEquity />
          </div>
          <div className='mt-4'>
            <a href='https://brainreply.lemonsqueezy.com/checkout/buy/1bc84253-1419-4789-8d25-91bc67ce71c2' className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-1 disabled:bg-gray-400">
              <span>前往购买</span>
            </a>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={handleOpenAddKey}>
          关闭
        </MuiButton>
      </DialogActions>
    </Dialog>
  )
}
export default DialogPre

// 解锁所有功能

// 搜索、AI字符、提示库等。

// 无限制集成

// 域检查、代码笔、代码高亮显示等。

// MacOS应用程序（查看演示）

// 最大便利性（macOS 11.3+）

// 自主机选项（了解更多信息）

// 在您自己的域上托管静态应用程序