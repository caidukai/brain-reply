/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import { useRouter } from "next/router";
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { IntlProvider } from "react-intl";
import en from "../lang/en-US.json";
import zhhans from "../lang/zh-Hans.json";
import { SnackbarProvider } from 'notistack';
import "../styles/globals.css";
import { wrapper } from '../redux/store'



const messages = {
  "en-US": en,
  "zh-Hans": zhhans,
};
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


function MyApp(props: MyAppProps) {
  const { locale = "zh-Hans" } = useRouter();
  const m = (messages as any)[locale] || messages['zh-Hans']
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BrainReply - 更优雅的ChatGPT客户端</title>
      </Head>

      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <IntlProvider locale={locale as any} messages={m}>
            <Component {...pageProps} />
          </IntlProvider>
        </ThemeProvider>
      </SnackbarProvider>

    </CacheProvider>
  );
}



export default wrapper.withRedux(MyApp)