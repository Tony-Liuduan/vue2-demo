/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-10 10:46:26
 * @LastEditTime 2020-06-10 16:55:34
 */
const {
    arrayMethods,
} = require('./array');
const {
    isObject,
    isPlainObject,
    def,
} = require('./utils');


/* 将object转换为响应式数据 */
function defineReactive(obj, key, val) {
    // 获取对象描述符
    let propDes = Object.getOwnPropertyDescriptor(obj);

    // 如果对象不能扩展则放弃
    if (propDes && propDes.configurable === false) {
        return;
    }

    // 对val继续递归监听转换响应式
    let childOb = observe(val);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log('getter', key, val);
            // TODO: 操作 childOb，dep依赖管理
            return val;
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) {
                return
            }
            console.log('setter key is', key, val, newVal);
            val = newVal;

            // 这一步很重要，是对新的值进行递归监听转换响应式
            childOb = observe(newVal);
        },
    });
}

class Observer {
    constructor(value) {
        this.value = value;

        // 防止重复响应式转换
        // 这里需要设置不可枚举，否则会导致死循环，默认属性不可枚举
        def(value, '__ob__', this, false);

        // 判断value是数组还是object，转为响应式数据
        if (Array.isArray(value)) {
            // 修改当前数组原型链，延长原型链，在新的原型上重写数组方法
            // 重写的意义是，如果通过数组索引进行响应式，使用push方法是没办法实现响应式，旧的索引不变
            // 使用unshift方法会造成数组的移动，触发多次update，且新增索引还是无法时间响应式
            // 这里通过改写数组原型方法，废除使用Object.defineProperty方法进行响应式，
            // 如果数组调用数组的原型方法，会在改写的方法中自动触发更新通知，触发页面渲染，而新增的元素也会被立即observe上
            Object.setPrototypeOf(value, arrayMethods);
            this.observeArray(value);

        } else {
            this.walk(value);
        }
    }

    // 对对象每个属性进行响应式监听，内部会对子属性递归处理
    walk(obj) {
        for (const [key, val] of Object.entries(obj)) {
            defineReactive(obj, key, val);
        }
    }

    // 对数组的每个元素进行响应式监听
    observeArray(array) {
        for (const item of array) {
            observe(item);
        }
    }
}


function observe(value) {
    if (!isObject(value)) {
        return
    }

    let ob;
    if (Object.prototype.hasOwnProperty.call(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else if (
        (Array.isArray(value) || isPlainObject(value)) &&
        // 对象是可扩展的，可以添加新属性的，不是 seal 或 freeze 的，就是 configurable 属性得是true
        Object.isExtensible(value)
    ) {
        ob = new Observer(value);
    }

    return ob;
}

module.exports = {
    observe,
};
