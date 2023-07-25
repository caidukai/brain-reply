/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React from "react";
import { Button, List, ListItemIcon, ListItemButton, ListItemText, Avatar } from '@mui/material'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ChatssetType, ChatType } from '@/interface/index'
import SMSIcon from "@mui/icons-material/Sms"
import download from "downloadjs"

interface ExportChatProps {
  // mobileOpen: boolean,
  chats: ChatType[],
  chatsset: ChatssetType,
}

const ExportChat = (props: ExportChatProps) => {
  const { chats, chatsset } = props

  const handleDownAll = () => {
    download(JSON.stringify(chats), "全部聊天记录.json", "text/plain");
  }
  const handleEx = (chat: ChatType) => {
    download(JSON.stringify(chat), `${chat.title}.json`, "text/plain");
  }
  return (
    <div className="sm:w-96">
      <div className="text-right mt-4 mb-2">
        <Button color="primary" onClick={handleDownAll} variant="contained">导出全部会话</Button>
      </div>
      <List className="">
        {chats.map((it, idx) => {
          return (
            <ListItemButton key={idx}>
              <Avatar className="mr-2 rounded-md" variant="square">
                <SMSIcon />
              </Avatar>
              <ListItemText primary={it.title} />
              <Button className="ml-6" variant="outlined" size="small" onClick={() => handleEx(it)}>立即导出</Button>
            </ListItemButton>
          )
        })}
      </List>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  const { chats, chatsset } = state
  return { chats, chatsset }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(ExportChat)