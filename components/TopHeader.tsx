/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from 'react-redux'
import { ChatType, aimodeLabel } from "@/interface/index"

const TopHeader = (props: { chat: ChatType, onMobileopen: (show: boolean) => void }) => {
  const { chat } = props
  const { title, id = null, messages, aimodeKey } = chat;
  // 一般只有newchat没有id  因为还没正式对话形成会话历史
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className="bg-white shadow-sm sm:ml-72 sm:pl-72 z-10"

      >

        <Toolbar className='flex items-center justify-center w-full p-2 border-bottom-2 border-gray-200 shadow-bottom flex-col min-w-0'>
          <div className="font-semibold truncate w-full text-center px-12 text-black dark:text-white">
            {title}
          </div>
          <div className="text-xs text-gray-400 w-full truncate text-center px-16">
            {!id
              ? <span>开始新的会话</span>
              : <>
                <span>{aimodeLabel[aimodeKey]} ⋅ </span>{messages.length} 条消息
                {/* <span> ⋅ 89 tokens used (~$0.000178)</span> */}
              </>
            }
          </div>
        </Toolbar>
        <div className='absolute h-full flex items-center block sm:hidden'>
          <IconButton
            onClick={() => props.onMobileopen(true)}
            color="inherit"
            aria-label="open drawer"
            edge="start"

            sx={{ mr: 1, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </AppBar>
    </>
  )
}
const mapStateToProps = (state: any) => {
  const { chats, chatsset, newchat } = state
  const chat = chatsset.selected != null ? chats[chatsset.selected] : newchat
  return { chat: chat }
}
const mapPropsToDispatch = () => {
  return {

  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(TopHeader)