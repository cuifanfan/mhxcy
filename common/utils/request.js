const BASE_URL='';

//  公共的请求方法
function request({
    url,
    method,
    // 不填为不需要token,为true为需要token
    isAuth,
    data,
    // 默认显示Loading
    isShowLoading = true
}) {
    return new Promise((resolve, reject) => {
        // 接口不需要传token,默认值为{}
        let header = {}

        if (isAuth) {
            // 接口需要传token
            let token = uni.getStorageSync('token')
            // 接口需要token，但是没有token，跳转登录页
            if (!token) {
                uni.showToast({
                    icon: 'none',
                    title: '请先登录！'
                })
                uni.navigateTo({
                    url: '/pages/login/login'
                })
                return
            }
            header.token = token
        }
        // 请求前开启loading
        if (isShowLoading) {
            uni.showLoading({
                title: '加载中',
                mask: true
            })
        }

        uni.request({
            url: BASE_URL + url,
            method,
            header,
            data: data,
            complete: res => {
                let {
                    statusCode
                } = res
                // 请求后关闭loading
                if (isShowLoading) {
                    uni.hideLoading()
                }
                if (statusCode === 401) {
                    uni.clearStorageSync()
                    uni.showToast({
                        icon: 'none',
                        title: '登录凭证过期，请重新登录'
                    })
                    // 跳转登录页面
                    uni.navigateTo({
                        url: '/pages/login/login'
                    })
                } else if (statusCode === 200) {
                    // 请求成功后
                    let {
                        code
                    } = res.data;
                    if (code === 200) {
                        resolve(res.data)
                    } else {
                        // 如果有其他规则，可以直接加这
                        resolve(res.data)
                    }
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '网络请求失败'
                    })
                    reject(res)
                }
            }
        })
    })
}

export default request

