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
import _trim from 'lodash/trim'
import { useSnackbar } from 'notistack';
import { setLS } from '@/utils/viewhelper'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { ActionSetNewChatModel, ActionShowNewChatModel } from "@/redux/action/chat"
import { aimodeLabel, ChatType } from '@/interface/index'
import DialogSetModelDesc from './DialogSetModelDesc'

interface DialogSetModelProps {
  newchat: ChatType,
  onSetNewChatModel: (key: string) => void,
  show: boolean,
  onShow: (show: boolean) => void,
}

const DialogSetModel = (props: DialogSetModelProps) => {
  const [aiModelKey, setAiModelKey] = useState(props.newchat.aimodeKey)
  const { enqueueSnackbar } = useSnackbar();
  const handleOpenAddKey = () => {
    props.onShow(false)
  }
  const handleChange = (e: SelectChangeEvent) => {
    setAiModelKey(e.target.value as any);
  }
  const handleSave = () => {
    props.onSetNewChatModel(aiModelKey)
    handleOpenAddKey()
    enqueueSnackbar("模型切换成功")
  }
  const Desc: any = DialogSetModelDesc[aiModelKey]
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
              <h2 className="text-center text-xl font-semibold">模型设置</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6">
                      模型{" "}
                      <span className="bg-green-500 px-2 py-1 rounded-full text-white ml-1">
                        GPT-4 支持！
                      </span>
                    </label>
                    <a
                      className="text-xs hover:underline text-blue-500"
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://platform.openai.com/docs/guides/chat"
                      tabIndex={0}
                    >
                      学习更多 →
                    </a>
                  </div>
                  <Select className="my-4" fullWidth value={aiModelKey} onChange={handleChange}>
                    {Object.keys(aimodeLabel).map((it, idx) => {
                      return <MenuItem key={idx} value={it}>{(aimodeLabel as any)[it] as any}</MenuItem>
                    })}
                  </Select>
                </div>
                <Desc />
                <div className="text-center space-x-2">
                  <button onClick={handleSave} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1">
                    <span>确认</span>
                  </button>
                  <button onClick={handleOpenAddKey} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1 dark:text-gray-200">
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const { app, newchat } = state

  return { show: app.showSetNewChatModel, newchat }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onSetNewChatModel: (key: string) => {
      dispatch(ActionSetNewChatModel(key))
    },
    onShow: (show: boolean) => {
      dispatch(ActionShowNewChatModel(show))
    }
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(DialogSetModel)