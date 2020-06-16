/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-16 14:49:58
 * @LastEditTime 2020-06-16 15:01:12
 */
var proxyer = new Proxy({}, {
    get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
});


var tar = { x: 100 };
// proxyer 是proxy的实例
var proxyer = new Proxy(tar, {
    get(target, propKey, receiver) {
        console.log(`getting ${propKey}!`, target, propKey, receiver);
        return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
        // console.log(tar === target, receiver === proxyer);
        console.log(`setter`, target, propKey, value, receiver);
        Reflect.set(target, propKey, value, receiver);
    },
})

proxyer.timer = 1;
// console.log(proxyer.timer, tar, proxyer, tar === proxyer)
console.log('---')
// 使用 defineProperty 和 proxy 的区别
// 使用 defineProperty，我们修改原来的 proxyer 对象就可以触发拦截
// 使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截
tar.timer = 2;