import { ChatType, aimodeKeys, messagesRoleType, messagesType, assistantStartMessagesType } from '@/interface/index'
import typeenums from "@/redux/action/typeenums"


// export const setLS = (key: string, val: any) => {
//   return localStorage.setItem(`br-${key}`, JSON.stringify(val))
// }

let initState: ChatType[] = []

const initChatItems = [
  {
    id: "K9RNZFS9HCGRURBA",
    title: "与脱口秀演员对话",
    aimodeKey: aimodeKeys.GPT35TURBO,
    messages: [
      {
        role: messagesRoleType.system,
        content: "你是一个脱口秀演员"
      }
    ]
  },
  {
    id: "K9RNZFS9HCGRURBB",
    title: "与专业律师对话",
    aimodeKey: aimodeKeys.GPT35TURBO,
    messages: [
      {
        role: messagesRoleType.system,
        content: "你是一个脱口秀演员"
      }
    ]
  }
]

let actionObj: any = {}

actionObj[typeenums.USER_SEND_MSG] = (state: ChatType[], action: any) => {
  let { idx, ...rest } = action.payload
  let old = state[idx]
  let nw = { ...old, messages: [...old.messages, rest] }

  let s = state.slice(0, idx)
  let e = state.slice(idx + 1, state.length)
  return [...s, nw, ...e]
}

// actionObj[typeenums.START_GET_REPLY] = (state: ChatType[], action: any) => {
//   let idx = action.payload
//   let old = state[idx]
//   let newAssistant: messagesType = { role: messagesRoleType.assistant, chat: { ...old }, isFetching: true, content: '' }
//   let nw = { ...old, messages: [...old.messages, newAssistant] }
//   let s = state.slice(0, idx)
//   let e = state.slice(idx + 1, state.length)
//   return [...s, nw, ...e]
// }
actionObj[typeenums.START_GET_REPLY] = (state: ChatType[], action: any) => {
  let idx = action.payload
  let old = state[idx]
  // let newAssistant: messagesType = { role: messagesRoleType.assistant, chat: { ...old }, isFetching: true, content: '' }
  let nw = { ...old, isFetching: true }
  let s = state.slice(0, idx)
  let e = state.slice(idx + 1, state.length)
  const n = [...s, nw, ...e]

  return n
}
actionObj[typeenums.SUCCESS_GET_REPLY] = (state: ChatType[], action: any) => {
  let { chatIdx, ...rest } = action.payload
  let old = state[chatIdx]
  let nw = { ...old, isFetching: false, messages: [...old.messages, rest] }
  let s = state.slice(0, chatIdx)
  let e = state.slice(chatIdx + 1, state.length)
  let n = [...s, nw, ...e]
  return n
}
actionObj[typeenums.DELETE_CHAT] = (state: ChatType[], action: any) => {
  let idx = action.payload
  let s = state.slice(0, idx)
  let e = state.slice(idx + 1, state.length)
  let n = [...s, ...e]
  const isServerSide = typeof window === 'undefined'
  if (!isServerSide) {
    localStorage.setItem(`br-chats`, JSON.stringify(n.map((it) => it.id)))
    localStorage.removeItem(`br-chats-${state[idx].id}`)
  }

  return n
}
actionObj[typeenums.END_GET_REPLY] = (state: ChatType[], action: any) => {
  let { chatIdx, ...rest } = action.payload
  let old = state[chatIdx]
  let nw = { ...old, isFetching: false }
  let s = state.slice(0, chatIdx)
  let e = state.slice(chatIdx + 1, state.length)
  return [...s, nw, ...e]
}

actionObj[typeenums.UPDATEASSISTANTMSG] = (state: ChatType[], action: any) => {
  let { chatIdx, msgIdx, payload } = action.payload
  let old = state[chatIdx]
  let newAssistant: messagesType = { role: messagesRoleType.assistant, content: payload.content }
  let smsg = old.messages.slice(0, msgIdx)
  let emsg = old.messages.slice(msgIdx + 1, old.messages.length)
  let nw = { ...old, messages: [...smsg, newAssistant, ...emsg] }
  let s = state.slice(0, chatIdx)
  let e = state.slice(chatIdx + 1, state.length)
  return [...s, nw, ...e]
}
actionObj[typeenums.PUSH_CHAT] = (state: ChatType[], action: any) => {
  const n = [action.payload, ...state]
  const isServerSide = typeof window === 'undefined'
  if (!isServerSide) {
    localStorage.setItem(`br-chats`, JSON.stringify(n.map((it) => it.id)))
  }
  return n
}
actionObj[typeenums.CHATS_INIT] = (state: ChatType[], action: any) => {
  return [...state, ...action.payload]
}

const chats = (state: ChatType[] = initState, action: any) => {
  let proc = actionObj[action.type]
  let p = proc ? proc(state, action) : state
  return p
}
export default chats