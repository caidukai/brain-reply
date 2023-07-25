/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@/components/Button'
import { Dialog, DialogContent, DialogActions, Tabs, Tab } from '@mui/material'
import settingTab from "@/components/Setting/index"
const tabs = [
  {
    key: 'exportchat',
    label: '导出聊天'
  },
  {
    key: 'appset',
    label: '应用设置'
  },
  {
    key: 'storagespace',
    label: '存储空间'
  }
]


const Setting = () => {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(tabs[0].key)
  const handleOpen = () => {
    setOpen(!open)
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const A: any = (settingTab as any)[tab]
  return (
    <>
      <Button className="w-16" onClick={handleOpen}>
        <SettingsIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <h2 className="my-2 text-center text-xl font-bold">设置</h2>
          <Tabs value={tab} onChange={handleTabChange}>
            {tabs.map((it, idx) => (<Tab value={it.key} key={idx} label={it.label} />))}
          </Tabs>
          <A />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Setting