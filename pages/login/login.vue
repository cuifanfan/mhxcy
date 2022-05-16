<template>
  <div class="login">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
        username:'',
        password:''
    };
  },
};
</script>
<style lang="scss" scoped>
</style>