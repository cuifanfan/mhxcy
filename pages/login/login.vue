<template>

  <div class="login">
    <header-diy
      :backHidden="2"
      :type="2"
      class="topbar"
      :titleName="pageName"
    ></header-diy>
    账户
    <u--input
      placeholder="请输入内容"
      border="surround"
      v-model="username"
      @change="change"
    ></u--input>
    密码
    <u--input
      placeholder="请输入内容"
      border="surround"
      v-model="password"
      @change="change"
    ></u--input>
    <u-button @click="submit" type="primary" text="确定"></u-button>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import request from '../../common/utils/request'
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
        username:'admin',
        password:'123456',
        pageName: "登录",
    };
  },
  methods:{
      submit(){

      }
  }
};
</script>
<style lang="scss" scoped>
</style>