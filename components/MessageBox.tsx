/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useEffect, useState } from 'react'
import { MessageBoxProps } from "@/interface/index"
import Avatar from "@mui/material/Avatar"
import SettingsIcon from "@mui/icons-material/Settings"
import { messagesRoleType, messagesType } from "@/interface/index"
import LoadingDots from "./LoadingDots"
import { getRenderString } from '@/utils/viewhelper'

export const Avatars = {
  [messagesRoleType.system]: () => {
    return <Avatar className='rounded-md' variant="square"> <SettingsIcon /></Avatar>
  },
  [messagesRoleType.user]: Avatar,
  [messagesRoleType.assistant]: () => {
    return <Avatar className='rounded-md' variant="square" src='https://pic.imgdb.cn/item/64115338ebf10e5d53b24e02.png'></Avatar>
  }
}

export const MessageBoxBase = ({ item }: MessageBoxProps) => {
  const { content, role } = item
  const Ava: any = Avatars[role]
  return (
    <div className='px-4 rounded-lg mb-2'>
      <div className='pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]'>
        <div className='absolute top-2 left-2'>
          <Ava className="rounded-md" variant="square" src={''} />
        </div>
        <div className="w-full">
          <div>
            <div className="text-sm whitespace-pre-wrap space-y-2 w-fit bg-blue-500 text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export const MessageBoxAssistant = ({ item, isFetching }: { isFetching?: boolean } & MessageBoxProps) => {
  const { content = '', role = '', } = item
  return <div className='px-4 rounded-lg mb-2'>
    <div className='pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]'>
      <div className='absolute top-2 left-2'>
        <Avatars.assistant />
      </div>
      <div className="w-full">
        <div className='max-w-md relative'>

          {
            isFetching
              ? <div className="text-sm whitespace-pre-wrap space-y-2 w-fit bg-gray-700 text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline">
                <LoadingDots color="white" style="large" />
              </div>
              : <div dangerouslySetInnerHTML={{ __html: getRenderString(content) }} className="text-sm whitespace-pre-wrap space-y-2 w-fit bg-gray-700 text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline">

              </div>
          }
        </div>
      </div>
    </div>
  </div>
}
// export const MessageBoxAssistantLoading = () => {
//   return <div className='px-4 rounded-lg mb-2'>
//     <div className='pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]'>
//       <div className='absolute top-2 left-2'>
//         <Avatars.assistant />
//       </div>
//       <div className="w-full">
//         <div className='max-w-md relative'>
//           <div className="text-sm whitespace-pre-wrap space-y-2 w-fit bg-gray-700 text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline">

//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// }
const MessageBox = {
  [messagesRoleType.system]: MessageBoxBase,
  [messagesRoleType.user]: MessageBoxBase,
  [messagesRoleType.assistant]: MessageBoxAssistant
}
export default MessageBox