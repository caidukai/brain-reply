import { combineReducers } from "redux"
import chatsset from './chatsset'
import chats from './chats'
import newchat from './newchat'
import app from './app'

export default combineReducers({ chatsset, chats, newchat, app })