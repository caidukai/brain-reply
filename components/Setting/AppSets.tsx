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
import { setLS } from "@/utils/viewhelper"
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ChatssetType } from '@/interface/index'
import { ActionChangeChatsSet } from "@/redux/action/chatsset"

interface AppsetProps {
  chatsset: ChatssetType,
  onChangeAppset: (e: any) => void
}

const AppSets = ({ chatsset, onChangeAppset }: AppsetProps) => {

  useEffect(() => {

  }, [])
  const handleCustomApiUrl = (e: any) => {
    onChangeAppset({ customApiUrl: e.target.value })
    setLS('customApiUrl', e.target.value)
  }
  return <div className="sm:w-96">
    <div className="my-4">
      <div className="mb-4">
        <TextField onChange={handleCustomApiUrl} value={chatsset.customApiUrl} fullWidth id="custom-apiurl" label="自定义接口地址" variant="standard" />
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
    onChangeAppset: (e: any) => {
      dispatch(ActionChangeChatsSet(e))
    }
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(AppSets)