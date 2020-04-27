
import React from 'react'
import serialize from 'serialize-javascript'
// import { Link } from 'react-router-dom'
import '@/assets/common.less'

const commonNode = props => (
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ?  props.children  : ''
  props.children
    ? props.children
    : ''
)

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props)
  } else {
    const { serverData } = props.layoutData
    const { injectCss, injectScript } = props.layoutData.app.config
    const injectBaiduScript = `
    <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c9e38dadc455acbdf49d12d33445fc4b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    </script>`
    return (
      <html lang='en'>
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
          <meta name="format-detection" content="telephone=no, email=no" />
          <meta name="renderer" content="webkit" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>知鸟-智能的移动培训互动平台，中国平安出品</title>
          <meta name="keywords" content="知鸟，移动学习，企业培训，企业内训，员工培训，移动培训，职工教育，m-learning" />
          <meta name="description" content="知鸟是中国平安倾力打造的移动学习平台，旨在帮助企业实现随时随地高效员工培训，解决企业人才内训瓶颈，帮助员工实现能力提升，助力企业业务发展。“知鸟”功能完备，设计先进，不仅提供简单易用的“做课”工具，还可满足企业个性化需求，可按企业需求设定App首页模板；知鸟平台支持多种企业培训形式，支持员工自学或必修课强制推送，支持线上线下结合O2O混合教学模式。" />
          <meta content="本页版权归中国平安所有. all rights reserved" name="copyright" />

          <meta name="baidu-site-verification" content="WlTufp19WV" />
          <meta name="sogou_site_verification" content="8lDK2lCFea"/>
          <meta name="360-site-verification" content="de81395278fe5dd4ba99c70fee33b0de" />
          <link href="https://cdn.bootcdn.net/ajax/libs/flexiblegs-css/5.6.0/flexiblegs-css.min.css" rel="stylesheet"></link>
          {
            injectCss && injectCss.map(item => <link rel='stylesheet' href={item} key={item} />)
          }
          <div dangerouslySetInnerHTML={{
            __html: injectBaiduScript
          }} />
        </head>
        <body>
          <div id='app'>{ commonNode(props) }</div>
          {
            serverData && <script dangerouslySetInnerHTML={{
              __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}` // 使用pathname作为组件初始化数据的隔离，防止props污染
            }} />
          }
          <div dangerouslySetInnerHTML={{
            __html: injectScript && injectScript.join('')
          }} />
        </body>
      </html>
    )
  }
}

export default Layout
