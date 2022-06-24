
<script>
var that={
      webSocket: null, // webSocket实例
      lockReconnect: false, // 重连锁，避免多次重连
      maxReconnect: 6,  // 最大重连次数， -1 标识无限重连
      reconnectTime: 2, // 重连尝试次数
      heartbeat: {
        interval: 30 * 1000, // 心跳间隔时间
        timeout: 10 * 1000, // 响应超时时间
        pingTimeoutObj: null, // 延时发送心跳的定时器
        pongTimeoutObj: null, // 接收心跳响应的定时器
        pingMessage: JSON.stringify({type: 'ping'}) // 心跳请求信息
      }
    }

export default {
  props: {
    uri: {
      type: String
    },
  },
  data() {
    return {
      webSocket: null, // webSocket实例
      lockReconnect: false, // 重连锁，避免多次重连
      maxReconnect: 6,  // 最大重连次数， -1 标识无限重连
      reconnectTime: 2, // 重连尝试次数
      heartbeat: {
        interval: 30 * 1000, // 心跳间隔时间
        timeout: 10 * 1000, // 响应超时时间
        pingTimeoutObj: null, // 延时发送心跳的定时器
        pongTimeoutObj: null, // 接收心跳响应的定时器
        pingMessage: JSON.stringify({type: 'ping'}) // 心跳请求信息
      }
    }
  },
  computed: {
    token() {
      return uni.getStorageSync('token')
    },
    tenant() {
      return uni.getStorageSync('tenantId')
    }
  },
  created() {
    this.initWebSocket()
	console.log('xxxx',this)
  },
  destroyed: function () {
    that.webSocket.close()
    this.clearTimeoutObj(this.heartbeat)
  },
  methods: {
    /**
     * 初始化 weoSocket
     */
    initWebSocket() {
      // ws地址
      let host = window.location.host;
      let wsUri = `ws://121.36.247.77:9999/data/ws/info?access_token=${this.token}&TENANT-ID=${this.tenant}`
      // 建立连接
      that.webSocket = new WebSocket(wsUri)
      // 连接成功
      that.webSocket.onopen = this.onOpen
      // 连接错误
      that.webSocket.onerror = this.onError
      // 接收信息
      that.webSocket.onmessage = this.onMessage
      // 连接关闭
      that.webSocket.onclose = this.onClose
    },
    /**
     * 重新连接
     */
    reconnect() {
      if (!this.token) {
        return
      }
      if (that.lockReconnect || (that.maxReconnect !== -1 && that.reconnectTime > that.maxReconnect)) {
        return
      }
      that.lockReconnect = true
      setTimeout(() => {
        that.reconnectTime++
        // 建立新连接
        this.initWebSocket()
        that.lockReconnect = false
      }, 5000)
    },
    /**
     * 清空定时器
     */
    clearTimeoutObj: function (heartbeat) {
      heartbeat.pingTimeoutObj && clearTimeout(heartbeat.pingTimeoutObj)
      heartbeat.pongTimeoutObj && clearTimeout(heartbeat.pongTimeoutObj)
    },
    /**
     * 开启心跳
     */
    startHeartbeat() {
      const webSocket = that.webSocket
      const heartbeat = that.heartbeat
      // 清空定时器
      this.clearTimeoutObj(heartbeat)
      // 延时发送下一次心跳
      heartbeat.pingTimeoutObj = setTimeout(() => {
        // 如果连接正常
        if (webSocket.readyState === 1) {
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          webSocket.send(heartbeat.pingMessage)
          // 心跳发送后，如果服务器超时未响应则断开，如果响应了会被重置心跳定时器
          heartbeat.pongTimeoutObj = setTimeout(() => {
            webSocket.close()
          }, heartbeat.timeout)
        } else {
          // 否则重连
          this.reconnect()
        }
      }, heartbeat.interval)
    },
    /**
     * 连接成功事件
     */
    onOpen() {
      console.log('socket链接成功')
      //开启心跳
      this.startHeartbeat()
      that.reconnectTime = 0
    },
    /**
     * 连接失败事件
     * @param e
     */
    onError(e) {
      //错误
      console.log(e)
      console.log(`WebSocket connection error：${e.code} ${e.reason} ${e.wasClean}`)
      //重连
      this.reconnect()
    },
    /**
     * 连接关闭事件
     * @param e
     */
    onClose(e) {
      //关闭
      console.log(`WebSocket connection closed：${e.code} ${e.reason} ${e.wasClean}`)
      //重连
      this.reconnect()
    },
    /**
     * 接收服务器推送的信息
     * @param msgEvent
     */
    onMessage(msgEvent) {
      //收到服务器信息，心跳重置并发送
      this.startHeartbeat()
      const text = msgEvent.data

      if (text.indexOf('pong') > 0) {
        return
      }
//  {"id":1540177645312499714,
//  "newsInfo":"陈升茶厂::40204067::当前ph值低于最低阈值::土壤ph值最高阈值:22::当前土壤ph值为7.0",
//  "newsKind":"告警","pushTime":"2022-06-24T11:39:00.416",
//  "recipientId":1,"status":"气象告警",
//  "title":"你猜怎么着？"}
      console.log('收到服务器消息',text)
	  let get=JSON.parse(text)
	  let addText=''
	  if(get.newsKind=='告警'){
		if(get.status=='气象告警'){
			addText=get.status+": "+(get.newsInfo.split("::"))[1]+(get.newsInfo.split("::"))[2]
		}else if(get.status=='离线告警'){
			addText=get.newsInfo
		}
		
	  }else if(get.newsKind=='推送'){
		addText=get.newsInfo
	  }
	 //console.log('tttttjjj',addText)
	  let getNewsList=uni.getStorageSync('newsList')
	  if(!getNewsList){
		let arr=[]
		arr.unshift(addText)
		uni.setStorageSync('newsList',JSON.stringify(arr))
	  }else{
		let getArr=JSON.parse(uni.getStorageSync('newsList'))
		getArr.unshift(addText)
		uni.setStorageSync('newsList',JSON.stringify(getArr))
	  }
	  //console.log('jfhdshjfhjksdfhjsf',uni.getStorageSync('newsList'))
	   uni.$emit("newCome", text)
    },
    /**
     * 数据发送
     * @param msg
     */
    send(msg) {
      //数据发送
      that.webSocket.send(msg)
    }
  }
}

</script>
<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import './common/common.scss';
	/*每个页面公共css */
	page{
		background: #F5F5F5;
	}
</style>
