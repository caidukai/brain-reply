/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React from 'react'
import { GreenSvg } from "@/components/Svgs"
const featList = [
  {
    label: "聊天记录搜索"
  },
  {
    label: "超多提示语料"
  },
  {
    label: "持续接入"
  },
  {
    label: "浏览器上本地运行，保护隐私"
  },
  {
    label: "无需登录"
  },
  {
    label: "使用您自己的 API key "
  },
  {
    label: "无月费"
  },
  {
    label: "代码高亮"
  },
  {
    label: "可私有化部署的代码包(邮件详谈)"
  }
]
const VipEquity = () => {
  return <div className="flex items-center justify-center">
    <div className="my-2 grid sm:grid-cols-2 gap-y-2 gap-x-6">
      {featList.map((item, idx) => {
        return (
          <div className="flex items-center justify-start space-x-1" key={idx}>
            <GreenSvg />
            <div className="text-sm">{item.label}</div>
          </div>
        )
      })}
    </div>
  </div>
}
export default VipEquity