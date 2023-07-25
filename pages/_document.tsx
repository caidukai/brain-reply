/**
 * @author brainreply
 * @date 2023-03-25
 * @twitter https://twitter.com/develop_atlas
 * @github https://github.com/caidukai/brain-reply
 * @copyright Copyright (c) 2023  brainreply.com
 * 
 */
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme, { } from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Script from 'next/script';

const ht = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-JLDT1BQJR1');
`
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/assets/favicon.ico" />
          <meta name="emotion-insertion-point" content="" />
          {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css" /> */}
          <link rel="stylesheet" href="/assets/css/dracula.css" />

          {(this.props as any).emotionStyleTags}
          <meta charSet="utf-8" />
          <meta name="title" content="BrainReply - 更优雅的ChatGPT客户端" />
          <meta
            name="description"
            content="使用增强功能的ChatGPT客户端，如聊天历史记录搜索、代码高亮、AI提示提示词库等"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://brainreply.com" />
          <meta property="og:title" content="BrainReply - 更优雅的ChatGPT客户端" />
          <meta
            property="og:description"
            content="使用增强功能的ChatGPT客户端，如聊天历史记录搜索、代码高亮、AI提示提示词库等"
          />
          <meta property="og:image" content="https://pic.imgdb.cn/item/64115338ebf10e5d53b24e02.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://brainreply.com" />
          <meta
            property="twitter:title"
            content="BrainReply - 更优雅的ChatGPT客户端"
          />
          <meta
            property="twitter:description"
            content="使用增强功能的ChatGPT客户端，如聊天历史记录搜索、代码高亮、AI提示提示词库等"
          />
          <meta
            property="twitter:image"
            content="https://pic.imgdb.cn/item/64115338ebf10e5d53b24e02.png"
          />
          <link rel="apple-touch-icon" sizes="152x152" href="https://pic.imgdb.cn/item/6426fcfea682492fcc63e25f.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="https://pic.imgdb.cn/item/6426fcfea682492fcc63e232.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="https://pic.imgdb.cn/item/6426fcefa682492fcc63c103.png"
          />
          <link rel="icon" type="image/png" sizes="32x32" href="https://pic.imgdb.cn/item/6426fcfca682492fcc63dddb.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="https://pic.imgdb.cn/item/6426fcf1a682492fcc63c32c.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="https://pic.imgdb.cn/item/6426fcfda682492fcc63de69.png" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="https://pic.imgdb.cn/item/6426fcf0a682492fcc63c28f.png" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JLDT1BQJR1"></script>
          <script dangerouslySetInnerHTML={{ __html: ht }}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};