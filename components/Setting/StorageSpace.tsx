/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useEffect, useState } from "react";
import { Typography, TextField } from "@mui/material"
import { getLSUseSize } from "@/utils/viewhelper"
import LinearProgress from "@mui/material/LinearProgress"
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ChatssetType } from '@/interface/index'
interface AppsetProps {
  chatsset: ChatssetType
}

const StorageSpace = ({ chatsset }: AppsetProps) => {
  const [localTotal, setLocalTotal] = useState({
    txt: '0 KB',
    num: 0
  })
  useEffect(() => {
    setLocalTotal((getLSUseSize() as any))
  }, [])
  const a = Math.ceil(localTotal.num / (1024 * 5))
  // console.log(a)
  return <div className="sm:w-96">
    <div className="my-4">
      <p className="mb-2  text-xs">
        您的所有数据都存储在浏览器的本地。每个浏览器都有不同的数据存储限制，一般限制为5MB。如果空间不足，您可以删除一些旧聊天记录。
      </p>
      <LinearProgress className="h-4 rounded-full mb-2" value={a} variant="determinate" />
      <div className="flex text-xs justify-between">
        <span>使用：{localTotal.txt}</span>
        <span>共5 MB</span>
      </div>
    </div>
  </div>
}
const mapStateToProps = (state: any) => {
  const { chatsset } = state
  return { chatsset }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(StorageSpace)