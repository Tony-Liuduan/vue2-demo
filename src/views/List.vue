<!--
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-07 10:59:47
 * @LastEditTime 2020-06-07 17:06:56
--> 
<template>
  <div class="list">
    <h1>This is a List page</h1>
    <p>获取到的count:{{count}}</p>
    <p>获取到的getter-list:{{filterList}}</p>
    <p>获取motaion添加的state:{{newStateValue}}</p>
    <p>获取module-A的name值:{{moduleAName}}</p>
    <p>获取module-B的name值:{{moudleBName}}</p>
    <p>获取module-A的age值:{{moduleAAge}}</p>
    
    <button @click="handleAdd({ count: 100 })">加-</button>
    <button @click="handleReduce">减-</button>
    <button @click="handleAddNewState">添加新state</button>
    <button @click="handleAction({ count: 0 })">action触发count异步改值</button>
    <button @click="asyncModifyModuleAName">action触发moduleA异步改name</button>
    <p></p>
    <div class="list-nav">
      <router-link to="/list/3/a/12">ListA</router-link>|
      <router-link :to="{path: '/list/4/b', query: {sex: 'man'}}">ListB</router-link>|
      <!-- 使用params只能使用name跳转路由 -->
      <router-link :to="{name: 'ListC', params: {sex: 'woman'}}">ListC</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions, createNamespacedHelpers } from "vuex";
const { mapState: mapStateModuleB } = createNamespacedHelpers('moduleB');
export default {
  name: "List",
  components: {},
  data() {
    return {};
  },
  created() {
    // console.log("create list");
  },
  methods: {
    // handleAdd() {
    //   this.$store.commit("add", { num: 100 });
    // },
    // handleReduce() {
    //   this.$store.commit("reduce");
    // },
    // handleAddNewState() {
    //   // 触发新添加state属性
    //   this.$store.commit("addNewState");
    // },

    // handleAction() {
    //   this.$store.dispatch("asyncModifyCount", { num: 100 });
    // },

    // asyncModifyModuleAName() {
    //   // 不带命名空间的，这时没用namespaced，默认注册在全局
    //   // this.$store.dispatch("asyncModifyModuleAName");
    //   // 使用命名空间，模块路径形式
    //   this.$store.dispatch("moduleA/asyncModifyName");
    // },

    // vuex-mapMutations 简写方式
    ...mapMutations({
      // handleAdd(commit) {
      //   commit("add", { num: 100 });
      // },
      handleAdd: "add",
      handleReduce: "reduce",
      handleAddNewState: "addNewState"
    }),
    ...mapActions({
      handleAction: "asyncModifyCount"
    }),
    ...mapActions("moduleA", {
      asyncModifyModuleAName: "asyncModifyName"
    })
  },
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    // filterList() {
    //   return this.$store.getters.filterList;
    // },

    // moduleAName() {
    //   // return this.$store.state.moduleA.name;
    //   return this.$store.getters["moduleA/getName"];
    // },

    // 简写方式
    // ...mapState(["count"]),
    ...mapState({
      count: "count",
      newStateValue: state => (state.newState ? state.newState : "还没被赋值")
    }),
    // 模块state
    ...mapState("moduleA", {
      moduleAAge: "age"
    }),
    ...mapGetters({
      filterList: "filterList"
    }),
    // 使用命名空间的getters
    ...mapGetters("moduleA", {
      moduleAName: "getName"
    }),
    ...mapStateModuleB({
      moudleBName: 'name',
    }),
  },
  watch: {
    // $route(to, from) {
    //    console.log("watch list", to, from);
    // }
  }
};
</script>
