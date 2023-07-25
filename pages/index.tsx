/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import * as React from 'react';
import { connect } from 'react-redux';
import BottomEntry from '@/components/BottomEntry'
import Toolbar from '@mui/material/Toolbar';
import LeftDrawer from "@/components/LeftDrawer"
import TopHeader from "@/components/TopHeader"
import MainContent from "@/components/MainContent"
import { Dispatch } from 'redux'
import { ActionChatsInit, ActionSetOpenAIkey, ActionShowOpenAIkey, ActionShowPre, ActionSetLisencekey, ActionShowLicenseSet } from "@/redux/action/chat"
import { ActionChangeChatsSet } from "@/redux/action/chatsset"
import DialogSetOpenApiKey from "@/components/DialogSetOpenApiKey"
import { AppProps } from '@/interface/index'
import Drawer from "@mui/material/Drawer"
import clsx from 'clsx';
import DialogPre from '@/components/DialogPre'
import { getLS } from '@/utils/viewhelper'
import DialogSetLicense from '@/components/DialogSetLicense'
import DialogSetModel from "@/components/DialogSetModel"

// const drawerWidth = 320;

interface Props {
  app: AppProps,
  onSetOpenAiKey: (key: string) => void,
  onShowOpenAiKey: (show: boolean) => void
  onShowPre: (show: boolean) => void
  initRender: () => void
  onShowLicenseSet: (show: boolean) => void
  onSetLicense: (key: string) => void,
}


function FrontPage(props: Props) {
  const { onSetOpenAiKey, onShowOpenAiKey, app, onShowPre, initRender, onShowLicenseSet, onSetLicense } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = (show: boolean) => {
    setMobileOpen(show);
  };
  React.useEffect(() => {
    initRender()
  }, [])


  const onCloseMobileOpen = () => setMobileOpen(false);
  return (
    <>
      <TopHeader onMobileopen={handleDrawerToggle} />
      <Drawer onClose={onCloseMobileOpen} variant="temporary" open={mobileOpen} classes={{ paper: 'w-72 bg-gray-800' }} className="sm:hidden">
        <LeftDrawer />
      </Drawer>
      <Drawer variant="permanent" open={true} classes={{ paper: 'w-72 bg-gray-800' }} className=" hidden sm:block z-30">
        <LeftDrawer />
      </Drawer>

      <div
        className='sm:pl-72'
      >
        <Toolbar />
        <MainContent />
        <BottomEntry />
      </div>
      <DialogSetOpenApiKey onShow={onShowOpenAiKey} show={app.showOpenAISetApiKey} onSetOpenAiKey={onSetOpenAiKey} />
      <DialogPre onShow={onShowPre} show={app.showPre} />
      <DialogSetLicense onSetLicense={onSetLicense} onShow={onShowLicenseSet} show={app.showLicenseSet} />
      <DialogSetModel />
    </>
  );
}


const mapStateToProps = (state: any) => {
  return { app: state.app }
}
const mapPropsToDispatch = (dispatch: Dispatch) => {
  return {
    onSetOpenAiKey: (key: string) => {
      dispatch(ActionSetOpenAIkey(key))
    },
    onSetLicense: (key: string) => {
      dispatch(ActionSetLisencekey(key))
    },
    onShowOpenAiKey: (show: boolean) => {
      dispatch(ActionShowOpenAIkey(show))
    },
    onShowPre: (show: boolean) => {
      dispatch(ActionShowPre(show))
    },
    onShowLicenseSet: (show: boolean) => {
      dispatch(ActionShowLicenseSet(show))
    },
    initRender: () => {
      let openkey = getLS('openaikey')
      if (openkey) {
        dispatch(ActionSetOpenAIkey(openkey))
      }
      let licensekey = getLS('licensekey')
      if (licensekey) {
        dispatch(ActionSetLisencekey(licensekey))
      }
      let customApiUrl = getLS('customApiUrl')
      if (customApiUrl) {
        dispatch(ActionChangeChatsSet({ customApiUrl: customApiUrl }))
      }

      let chatIds = getLS('chats')
      if (chatIds) {
        let chats = chatIds.map((id: string) => {
          let s = getLS(`chats-${id}`)
          return s
        })
        dispatch(ActionChatsInit(chats))
      }

    }
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(FrontPage)
