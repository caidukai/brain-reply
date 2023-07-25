import typeenums from "./typeenums"
export const ActionChangeChatsSet = (payload: any) => {
  return {
    type: typeenums.CHANGE_CHATSSET,
    payload: payload
  }
}