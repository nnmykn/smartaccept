// @refresh reload
import { Component, JSX, Show, Suspense } from 'solid-js'
import { Assets, isServer } from 'solid-js/web'
import { SolidNProgress } from 'solid-progressbar'
import {
  ErrorBoundary,
  Body,
  FileRoutes,
  Html,
  Head,
  Routes,
  Scripts,
  Meta,
  Link,
  Title,
} from 'solid-start'
import { css, extractCss, ThemeProvider } from 'solid-styled-components'

import { ModalProvider } from './components/ui/modal'
import { ToastProvider } from './components/ui/toast'
import { UserProvider } from './context/user'
import { theme } from './style/theme'

import './style/global.css'

const ganalytics = import.meta.env['VITE_GANALYTICS_ID']
const ganalyticsScript = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config"," ${ganalytics}", {page_path: window.location.pathname,});`

const ChromeFilter: Component<{ children: JSX.Element }> = (props) => {
  return (
    <Show
      when={
        isServer ||
        (navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Mobile'))
      }
      fallback={
        <div
          class={css`
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
            text-align: center;
          `}
        >
          <div
            class={css`
              padding: 60px 70px;
              border: 1px solid #ccc;
              background-color: white;
              border-radius: 10px;
            `}
          >
            <img src="/assets/images/smartaccept-logo.svg" alt="logo" width="185px" />
            <h1
              class={css`
                font-size: 23px;
              `}
            >
              PC版Chromeのみ対応しています
            </h1>
            <p
              class={css`
                font-size: 0.8rem;
              `}
            >
              お手数ですが、ChromeまたはEdgeをご利用ください
            </p>
            <br />
            <a href="https://smartaccept.jp/smartaccept-env">SmartAcceptの動作環境を確認</a>
            <br />
            <a href="https://www.google.com/intl/ja_jp/chrome/">Chromeをダウンロード</a>
          </div>
        </div>
      }
    >
      {props.children}
    </Show>
  )
}

const Providers: Component<{ children: JSX.Element }> = (props) => (
  <ThemeProvider theme={theme}>
    <ToastProvider>
      <ModalProvider>
        <UserProvider>{props.children}</UserProvider>
      </ModalProvider>
    </ToastProvider>
  </ThemeProvider>
)

const Root = () => {
  const html = (
    <Html lang="ja">
      <Head>
        <Title>SmartAccept</Title>
        <Meta charset="utf-8" />
        <Link rel="canonical" href="https://app.smartaccept.jp" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />

        <Link rel="icon" href="/icon.png" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ganalytics}`} />
        {/* eslint-disable-next-line solid/no-innerhtml */}
        <script innerHTML={`${ganalyticsScript}`} />

        <Assets>
          {/* eslint-disable-next-line solid/no-innerhtml */}
          <style id="_goober" innerHTML={extractCss()} />
        </Assets>
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <ChromeFilter>
              <Providers>
                <SolidNProgress color="#3ea8ff" />
                <Routes>
                  <FileRoutes />
                </Routes>
              </Providers>
            </ChromeFilter>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  )
  return html
}

export default Root
