/**
 * @fileoverview Vue 类库
 * @author liuduan
 * @Date 2020-06-12 10:19:48
 * @LastEditTime 2020-06-14 16:32:25
 */
import {
    observe
} from './observer.js';
import Compile from './compile.js';

/**
 * @description 将data上的属性赋给vue实例，实现vue.key的响应式
 * @param {vue} target vue实例 
 * @param {string} vue.data 的 'data'
 * @param {string} key data 上的属性
 * @return {undefined}
 */
function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: function proxyGetter() {
            // 这里this指向vue实例，即target
            return this[sourceKey][key];
        },
        set: function proxySetter(val) {
            // 这里this指向vue实例，即target
            this[sourceKey][key] = val;
        }
    });
}

export default class Vue {
    constructor(options) {
        const data = options.data;
        const vm = this;

        vm._data = data;

        const keys = Object.keys(data);
        for (const key of keys) {
            // 遍历data上的key值，map给vue实例
            proxy(vm, '_data', key);
        }

        // 实现响应式数据
        observe(data);

        // 获取模板id
        const appId = options.el;
        const rootContainer = document.getElementById(appId);
        // 编译模板，替换数据
        const $frag = new Compile(rootContainer, this);

        // 编译完成后，将dom返回到app中
        rootContainer.appendChild($frag);
    }
}
