/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React from 'react'
import { aimodeKeys } from '@/interface/index'
const aimodeLabelDesc = {
  [aimodeKeys.GPT35TURBO]: () => {
    return (
      <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
        <div className="flex items-center justify-start flex-wrap gap-2 mb-2">
          <div>
            <b>模型</b>: GPT-3.5-TURBO
          </div>
          <div>
            <b>最大tokens</b>: 4,096
          </div>
        </div>
        <div>
          功能最强大的GPT-3.5模型将不断迭代更新！
          {/* Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of
          text-davinci-003. Will be updated with our latest model iteration. */}
        </div>
        {/* <div className="mt-2">
          <b>Training data</b>: Up to Sep 2021
        </div> */}
      </div>

    )
  },
  [aimodeKeys.GPT35TURBO0301]: () => {
    return (
      <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
        <div className="flex items-center justify-start flex-wrap gap-2 mb-2">
          <div>
            <b>模型</b>: GPT-3.5-TURBO
          </div>
          <div>
            <b>最大tokens</b>: 4,096
          </div>
        </div>
        <div>
          这是gpt-3.5-turbo在2023年3月1日上线时的镜像版本，我们不会更新优化这个版本的模型，将在2023年6月1日下线。
        </div>
        {/* <div className="mt-2">
          <b>Training data</b>: Up to Sep 2021
        </div> */}
      </div>
    )
  },
  [aimodeKeys.GPT4]: () => {
    return (
      <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
        <div className="flex items-center justify-start flex-wrap gap-2 mb-2">
          <div>
            <b>模型</b>: GPT-4
          </div>
          <div>
            <b>最大tokens</b>: 8,192
          </div>
        </div>
        <div>
          <div>
            <div className="text-orange-500 font-semibold text-xs my-2">
              {/* Note: you need API Access to GPT-4 to use this model. If you haven't
              already, join the waitlist here:  */}
              提示:你需要GPT-4的API权限才可使用这个模型。如果没有，可加入OpenAi的等候队列:https://openai.com/waitlist/gpt-4-api
            </div>
            <div>
              比GPT-3.5模型更强大，能够执行更复杂的任务，并且优化聊天。将持续迭代更新。
            </div>
          </div>
        </div>
        {/* <div className="mt-2">
          <b>Training data</b>: Up to Sep 2021
        </div> */}
      </div>

    )
  },
  [aimodeKeys.GPT4_0314]: () => {
    return (
      <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
        <div className="flex items-center justify-start flex-wrap gap-2 mb-2">
          <div>
            <b>模型</b>: GPT-4-0314
          </div>
          <div>
            <b>最大tokens</b>: 8,192
          </div>
        </div>
        <div>
          <div>
            <div className="text-orange-500 font-semibold text-xs my-2">
              提示:你需要GPT-4的API权限才可使用这个模型。如果没有，可加入OpenAi的等候队列:https://openai.com/waitlist/gpt-4-api
            </div>
            <div>
              2023年3月14日的gpt-4快照。与gpt-4不同的是，该模型将不会接受更新，并且只会在2023年6月14日结束的三个月内得到支持。
            </div>
          </div>
        </div>
        {/* <div className="mt-2">
          <b>Training data</b>: Up to Sep 2021
        </div> */}
      </div>
    )
  },
  [aimodeKeys.GPT4_32K]: () => {
    return (
      <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
        <div className="flex items-center justify-start flex-wrap gap-2 mb-2">
          <div>
            <b>模型</b>: GPT-4-32k
          </div>
          <div>
            <b>最大tokens</b>: 32,768
          </div>
        </div>
        <div>
          <div>
            <div className="text-orange-500 font-semibold text-xs my-2">
              提示:你需要GPT-4的API权限才可使用这个模型。如果没有，可加入OpenAi的等候队列:https://openai.com/waitlist/gpt-4-api
            </div>
            <div>
              与基础gpt-4模式相同的功能，但上下文长度是它的4倍。
              将与我们最新的模型迭代更新。
            </div>
          </div>
        </div>
        {/* <div className="mt-2">
          <b>Training data</b>: Up to Sep 2021
        </div> */}
      </div>

    )
  },
  [aimodeKeys.GPT4_32K0314]: () => {
    return (
      <div className="bg-green-100 p-4 rounded-lg dark:bg-green-800">
        <div className="flex items-center justify-start flex-wrap gap-2 mb-2">
          <div>
            <b>模型</b>: GPT-4-32k-0314
          </div>
          <div>
            <b>最大tokens</b>: 32,768
          </div>
        </div>
        <div>
          <div>
            <div className="text-orange-500 font-semibold text-xs my-2">
              提示:你需要GPT-4的API权限才可使用这个模型。如果没有，可加入OpenAi的等候队列:https://openai.com/waitlist/gpt-4-api
            </div>
            <div>
              2023年3月14日gpt-4-32的快照。不像gpt-4-32k，这个型号
              不会收到更新，并且只支持三个月
              截止到2023年6月14日。
            </div>
          </div>
        </div>
        {/* <div className="mt-2">
          <b>Training data</b>: Up to Sep 2021
        </div> */}
      </div>

    )
  },
}

export default aimodeLabelDesc