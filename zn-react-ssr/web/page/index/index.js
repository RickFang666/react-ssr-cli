import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import Home from './home'
import styles from './index.module.less'

function Page (props) {
  const [sizeInit, setSizeInit] = useState(false)
  useEffect(() => {
    if(document) {
      console.log('document', document)
      resize()
    }
  }, [])
  const resize = () => {
    return function (doc, win) {
        const docEl = doc.documentElement
        const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        const recalc = () => {
          let clientWidth = docEl.clientWidth
          if (!clientWidth) return
          if (clientWidth < 1000) clientWidth = 1000
          docEl.style.fontSize = 100 * clientWidth / 1920 + 'px'
        }
        if (!doc.addEventListener) return
        recalc()
        setSizeInit(true)
        win.addEventListener(resizeEvt, recalc, false)
        doc.addEventListener('DOMContentLoaded', recalc, false)
    }(document, window)
  }
  return (
    <div className={styles.wrapper}>
      {sizeInit ? <Home/>  : ''}
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Page
