/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import React, { useRef, useState, useEffect } from "react"
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ChatssetType, ChatType } from '@/interface/index'
import cls from "clsx"
import _ from 'lodash'
import typeenums from "@/redux/action/typeenums"
interface SearchChatsProps {
  // mobileOpen: boolean,
  chats: ChatType[],
  chatsset: ChatssetType,
  onChangeChat: (idx: number) => void
}
function enssr(html: any) {
  //1.首先动态创建一个容器标签元素，如DIV
  var temp = document.createElement("div");
  //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
  (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
  //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
  var output = temp.innerHTML;
  // temp = null;
  return output;
}
const SearchChats = (props: SearchChatsProps) => {
  const { chats, onChangeChat } = props
  const timer = useRef<any>(null)
  const el = useRef<any>()

  const [items, setItems] = useState<any[]>([])
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const handleChange = (e: any) => {
    setSearch(e.target.value)
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      handleStartSearch(e.target.value)
    }, 300)
  }
  const handleStartSearch = (val: string) => {
    let re = new RegExp(val, "gi");
    let items = []
    for (let i = 0; i < chats.length; i++) {
      let it = chats[i]
      // console.log(it)
      let { title, messages } = it
      let isHaveTitle = title.search(val) >= 0
      messages.filter((it) => {
        return it.content.search(val)
      })
      let idx = _.findIndex(messages, function (l: any) {
        return l.content.search(val) >= 0
      })
      let isHaveMsg = idx >= 0 ? true : false
      if (isHaveTitle || isHaveMsg) {
        items.push({
          title: enssr(isHaveTitle ? title : title).replace(re, `<span class="bg-yellow-700">${val}</span>`),
          idx: i,
          msg: enssr(isHaveMsg ? messages[idx].content : messages[messages.length - 1].content).replace(re, `<span class="bg-yellow-700">${val}</span>`)
        })
      }
    }
    setItems(items)
  }
  const handleShow = (show: boolean) => {
    setShow(show)
  }
  const handleSelChat = (it: any) => {
    console.log(it)
    props.onChangeChat(it.idx)
    setSearch('')
    setShow(false)
  }
  useEffect(() => {

    const handle = (event: any) => {
      if (!el.current?.contains(event.target) && show) {
        setShow(false)
      }
    };
    window.addEventListener('click', handle)
    return () => window.removeEventListener('click', handle)
  })

  return (
    <div className="flex relative" ref={el}>
      <input value={search} onFocus={() => handleShow(true)} onChange={handleChange} className="bg-gray-800 text-white px-2 py-1 rounded-md w-full mr-2" placeholder='搜索会话' />
      <div className={cls("absolute left-0 w-full pr-2", { "hidden": !show })} style={{ marginTop: '32px', zIndex: "9999999" }}>
        <div className="bg-gray-700  rounded-md">
          {items.map((it: any, idx: number) => {
            return (
              <div className="p-2 hover:bg-gray-600 cursor-pointer" key={idx} onClick={() => handleSelChat(it)}>
                <div className="text-gray-100 truncate w-full" dangerouslySetInnerHTML={{ __html: it.title }}></div>
                <div className="text-xs text-gray-400 font-normal truncate w-full" dangerouslySetInnerHTML={{ __html: it.msg }}></div>
              </div>
            )
          })}
        </div>
      </div>
      <span className="bg-yellow-700 hidden"></span>
      {/* <Button className="w-16 bg-gray-800"><FolderIcom /></Button> */}
    </div>
  )
}


const mapStateToProps = (state: any) => {
  const { chats, chatsset } = state
  return { chats, chatsset }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onChangeChat: (idx: number) => {
      dispatch({ type: typeenums.CHANGE_CHAT, payload: idx })
    }
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(SearchChats)
