/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-09 23:00:53
 * @LastEditTime 2020-06-10 16:57:08
 */
const {
    def,
} = require('./utils');

// 延长原型链，创建新的数组原型对象
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

// 给数组对象新的原型链上添加数组改写后的数组方法
methodsToPatch.forEach(method => {
    // 原生方法值
    const original = arrayProto[method];

    // Object.defineProperty..., 属性不可枚举
    def(arrayMethods, method, function mutator(...args) {
        // 通过原始方法计算出真结果
        const result = original.apply(this, args);

        let increased;

        // 找到所有可能新增元素的方法
        switch (method) {
            case 'push':
            case 'unshift':
                increased = args;
                break;

            case 'splice':
                // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
                increased = args.slice(2);

            default:
                break;
        }

        // 如果有新增的就再对新增的元素响应式封装
        if (increased) {
            // 这里是对新增的每个元素进行响应式
            // 注意：不是对新增元素数组集合响应式
            this.__ob__.observeArray(increased);
        }

        // TODO: notify change
        // ob.dep.notify();

        console.log('Array method notify', method, result);
        return result;
    }, false);
})



module.exports = {
    arrayMethods,
};