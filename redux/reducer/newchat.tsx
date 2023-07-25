import { ChatType, aimodeKeys } from '@/interface/index'
import typeenums from "@/redux/action/typeenums"

let initState: ChatType = {
  title: '新会话',
  isFetching: false,
  aimodeKey: aimodeKeys.GPT35TURBO,
  messages: []
}

let actionObj: any = {}

actionObj[typeenums.PUSH_NEWCHAT_MSG] = (state: ChatType, action: any) => {
  let s = { ...state, messages: [...state.messages, action.payload] }
  return s
}
actionObj[typeenums.SETNEWCHATMODEL] = (state: ChatType, action: any) => {
  let s = { ...state, aimodeKey: action.payload }
  return s
}


const newchat = (state: ChatType = initState, action: any) => {
  let proc = actionObj[action.type]
  let p = proc ? proc(state, action) : state
  return p
}
export default newchat