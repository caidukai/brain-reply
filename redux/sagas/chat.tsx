import { takeEvery, put, select, call } from 'redux-saga/effects'
import typeenums from "@/redux/action/typeenums"
import { messagesRoleType, ChatssetType, aimodeValus, ChatType } from "@/interface/index"
import { getChatGPTMsg } from "@/fetch/fetch"
import { getUTC } from "@/utils/viewhelper"
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

export const getNewChat = (state: any, idx: number): any => {
  return state.chats[idx]
}
export const getChatSet = (state: any, idx: number): any => {
  return state.chatsset
}

function* onInitCreateChat(action: any) {
  yield put({ type: typeenums.PUSH_CHAT, payload: action.payload })
  // 新回话
  yield put({ type: typeenums.CHANGE_CHAT, payload: 0 })

  yield put({ type: typeenums.GET_BRAIN_REPLY, payload: 0 })
}
function* onUserSendMessage(action: any) {
  // yield put({ type: typeenums.PUSH_CHAT, user: action.payload })
  // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
}
function* onGetBrainreply(action: any): any {
  let chatIdx = action.payload
  let chat: ChatType = yield (select as any)(getNewChat, chatIdx)
  let chatset: ChatssetType = yield (select as any)(getChatSet)

  let { messages, aimodeKey } = chat
  yield put({ type: typeenums.START_GET_REPLY, payload: chatIdx })
  try {
    let model = aimodeValus[aimodeKey]
    const payload = {
      messages: getMsgs(messages),
      model: model,
      stream: false,
    }
    let resp = yield call(getChatGPTMsg, payload, { key: chatset.openaiKey, customApiUrl: chatset.customApiUrl })
    let con = resp.data?.choices?.[0]?.message?.content
    if (con) {
      yield put({
        type: typeenums.SUCCESS_GET_REPLY, payload: {
          chatIdx: chatIdx,
          c_at: getUTC(),
          role: messagesRoleType.assistant,
          content: con
        }
      })
    }
  } catch (error) {
    console.log(error, "====")
    yield put({
      type: typeenums.END_GET_REPLY, payload: {
        chatIdx: chatIdx
      }
    })
  }
}
function* rootchat() {
  yield takeEvery(typeenums.INIT_CHAT, onInitCreateChat)
  yield takeEvery(typeenums.GET_BRAIN_REPLY as any, onGetBrainreply as any)

}

export default rootchat
