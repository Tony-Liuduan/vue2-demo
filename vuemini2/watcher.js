/**
 * @fileoverview dep 和 指令 的连接器
 * @author liuduan
 * @Date 2020-06-12 10:20:09
 * @LastEditTime 2020-06-14 17:06:58
 */

import Dep from './dep.js';
import { batcher } from './batcher.js';

let uid = 0;

export default class Watcher {
    constructor(vm, node, dataKey, nodeValueKey) {
        this.vm = vm;
        this.node = node;
        this.dataKey = dataKey;
        this.nodeValueKey = nodeValueKey;
        this.nodeValue;

        this.id = ++uid;

        Dep.target = this;
        // 初始化赋值
        this.update();
        Dep.target = null;
    }

    update() {
        this.get();

        // 批处理
        batcher.push(this);
    }

    /* 获取响应式key属性对应value值 */
    get() {
        // 之前已经将vm.data上的属性绑定到vm实例
        // 这里vm[key]是经过响应式获取，在getter中有dep操作
        this.nodeValue = this.vm[this.dataKey];
    }

    /* 批处理执行方法 */
    cb() {
        console.warn('批处理执行方法')
        this.node[this.nodeValueKey] = this.nodeValue;
    }
}