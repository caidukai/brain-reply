/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useState, useEffect } from "react";
import LoadingDots from "./LoadingDots"
import { Avatars } from './MessageBox'
import { messagesRoleType, messagesType } from "@/interface/index"
import axios from "axios";
export interface OpenAIStreamPayload {
  model: string;
  temperature: number;
  messages: messagesType[]
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}
export const getMsgs = (items: any[]) => {
  return items.filter((it) => {
    return !(it.role === messagesRoleType.assistant && it.isFetching)
  }).map((ite) => {
    let { c_at, ...rest } = ite
    return {
      ...rest
    }
  })
}
const MessageBoxAssistantI = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [generatedDescs, setGeneratedDescs] = useState<string>('');
  const fetchList = async () => {
    setLoading(true)
    try {
      setGeneratedDescs("");
      const payload = {
        messages: getMsgs(props.item.chat.messages),
        model: "gpt-3.5-turbo",
        stream: false,
      }
      let res = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        }
      })
      let con = res.data?.choices?.[0]?.message?.content
      if (con) {
        props.onUpdateAssistantMsg(props.idx, { content: con })
        setGeneratedDescs(con)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false)
    }

  }
  useEffect(() => {
    if (props?.item?.isFetching) {
      fetchList()
    }

  }, [])
  const c = loading ? <LoadingDots color="white" style="large" /> : generatedDescs
  return <div className='px-4 rounded-lg mb-2'>
    <div className='pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]'>
      <div className='absolute top-2 left-2'>
        <Avatars.assistant />
      </div>
      <div className="w-full">
        <div className='max-w-md relative'>
          <div className="text-sm whitespace-pre-wrap space-y-2 w-fit bg-gray-700 text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline">
            {c}
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default React.memo(MessageBoxAssistantI)