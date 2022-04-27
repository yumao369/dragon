# mint_nft
mint_nft

##BAG

```

    "http-proxy-middleware": "^2.0.1",                              //代理
    "i18next": "^21.5.3",                                           //语言包相关
    "i18next-browser-languagedetector": "^6.1.2",                   //语言包相关
    "js-base64": "^3.7.2",                                          //base64 序列化
    "js-cookie": "^3.0.1",                                          //js-cookie
    "mockjs": "^1.1.0",                                             //mock data
    "nanoid": "^3.2.0",                                             //random data
    "node-sass": "^7.0.1",                                          //scss
    "qrcode.react": "^1.0.1",                                       //二维码
    "react-copy-to-clipboard": "^5.0.4",                            //复制
    "react-custom-scrollbars": "^4.2.1",                            //滚动条
    "react-helmet": "^6.1.0",                                       //html header 设置
    "react-i18next": "^11.14.3",                                    //语言包相关
    "react-redux": "^7.2.2",                                        //状态管理
    "react-router-dom": "^5.2.0",                                   //路由
    "react-stomp": "^5.1.0",                                        //stomp 客户端
    "redux": "^4.0.5",                                              //redux
    "redux-thunk": "^2.3.0",                                        //redux 回调方法
    "sass-loader": "^11.0.1",                                       //scss
    "tp-js-sdk": "^3.7.1",                                          //TokenPocket

```

##DIR

```
    public/                                                         #入口文件，引入非strict库 

    src/
        Common/                                                     #通用方法或对象、配置，index.js中引入。调用方式 window.method
        Components/                                                 #组件库
        Containers/                                                 #高阶组件，用于APP.jsx初始化，Page初始化
        Lang/                                                       #自定义语言包，使用方式见/Pages/Home/Home.jsx
        Pages/                                                      #页面组件
        Redux/                                                      #状态管理，http请求,或通用方法
        App.jsx                                                     #初始化组件，引入路由，初始化redux状态
        index.js                                                    #react 入口
        setupProxy.js                                               #代理
```

##RUN

```
    $:~# yarn install
    $:~# yarn start 
```

##build

```
    $:~# yarn build
```

##开发规范【待交流】TODO：方便阅读，方便协作开发
```

    1.组件尽可能使用class组件

    2.Pages/${dir}/                                                 
        {page.jsx}                                                  #页面组件，通过 index.jsx 统一exports,所有页面通过/Pages/index.jsx再次统一exports,方便结构化加载Router/Menu;需写css通过style定义

    3.Components/
        {Components.jsx}                                            #目录结构与Pages目录结构一致，Page子组件统一通过index.jsx文件exports；每个组件对应一个scss文件，css类名不要重复，命名规则带上路径

    4.Containers/
        {Containers.jsx}                                            #通用高阶组件，通常用于 某个页面/几个页面 都需要执行某些通用方法，需早于被修饰组件执行

    5.Redux/
       Reducers/                                                    #定义store，通用格式，某些需要读取preState的操作在里面定义。index.jsx 统一 exports
       Actions/                                                     #定义actions,通常与Type名称一致，调用dispatch修改store;其它可定义通用方法在页面或组件调用。 index.jsx 统一 exports
       Types.jsx                                                    #定义状态常量

```

###TODO: 此文档用于<深圳市紫晓互动科技有限公司>当前WEB项目及其它WEB前端项目初始模板（REACT） CREATE : 2022/01/21



