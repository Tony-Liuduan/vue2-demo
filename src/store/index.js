/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-06 11:47:37
 * @LastEditTime 2020-06-07 17:07:23
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


// 默认：只有state注册在模块上，需要通过模块调用，其他的4个注册在全局上，不需要通过模块调用
// this.$store.state.moduleA.name
// this.$store.dispatch("asyncModifyModuleAName")
const moduleA = {
    // namespaced 属性将getters、mutations、actions、modules变为局部作用域，改变默认注册在全局
    namespaced: true,
    state: {
        name: 'moduleA',
        age: 9,
    },
    getters: {
        getAge(state) {
            return state.age + 1;
        },
        getName(state, getters, rootState, rootGetters) {
            console.log('getter-age:', getters.getAge);
            return [state.name, rootState.count, rootGetters.filterList];
        },
    },
    mutations: {
        addFix(state, { fix }) {
            state.name += fix;
        },
    },
    actions: {
        // 不带命名空间的测试方法 
        asyncModifyModuleAName(ctx) {
            console.log(ctx.state.name, ctx.rootState.count);
            setTimeout(() => {
                ctx.commit('addFix', { fix: 'xxx' });
            }, 200);
        },

        // 带命名空间的测试方法  
        asyncModifyName({
            dispatch,
            commit,
            // getters,
            // rootGetters,
        }) {
            setTimeout(() => {
                dispatch('asyncModifyCount', { count: 1000 }, { root: true });
                commit('reduce', null, { root: true });
            }, 0);
        },
    },
    modules: {

    },
};

const moduleB = {
    namespaced: true,
    state: {
        name: 'moduleB',
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {

    },
};


export default new Vuex.Store({
    // 所有需要管理的状态数据，唯一数据源
    state: {
        count: 10,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    // 主要对状态进行处理
    getters: {
        // computed store.getters
        filterList(state) {
            return state.list.filter(item => item % 2 === 0)
        },
    },
    // 唯一改变state方式，不可以进行异步操作
    mutations: {
        add(state, { count }) {
            state.count += count;
        },
        reduce(state) {
            state.count--;
        },
        addNewState(state) {
            // 方式1 添加新属性
            Vue.set(state, 'newState', 'i am new State value');
            // 方式2 替换原来的State         
            // this.replaceState({ 
            //     ...state,
            //     newState: 'i am new State value',
            // });
        },
        modifyCount(state, newState) {
            state.count = newState.count;
        },
    },
    // 进行异步操作处理，配合dispatch使用
    actions: {
        asyncModifyCount(ctx, newVal) {
            setTimeout(() => {
                ctx.commit('modifyCount', newVal);
            }, 500);
        }
    },
    // 进行模块化操作
    modules: {
        // 声明模块
        moduleA,
        moduleB,
    }
});


