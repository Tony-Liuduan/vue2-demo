<!--
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-06 11:50:46
 * @LastEditTime 2020-06-07 12:23:33
--> 
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
