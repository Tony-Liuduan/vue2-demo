/**
 * @fileoverview 编译模板模块
 * @author liuduan
 * @Date 2020-06-14 15:20:16
 * @LastEditTime 2020-06-14 17:34:41
 */
import Watcher from './watcher.js';

/*

<div id="app">
    <input type="text" v-model="message">
    {{ message }}
</div>

*/


export default class Compile {
    /**
     * @description 编译模板节点
     * @param {dom} node是根节点dom
     * @param {vue} vm是vue实例
     * @return {dom} 编译后的dom节点
     */
    constructor(node, vm) {
        this.$frag = this.nodeToFragment(node, vm);
        return this.$frag;
    }

    nodeToFragment(node, vm) {
        const $frag = document.createDocumentFragment(); // 创建文档片段、

        let child;

        while (child = node.firstChild) {
            this.compileNode(child, vm);

            // 将子节点一个一个转移给文档片段
            $frag.appendChild(child);
        }

        return $frag;
    }

    compileNode(node, vm) {
        const nodeType = node.nodeType;

        switch (nodeType) {

            // 处理 {{message}} 节点为text类型
            case 3:
                if (/\{\{(.*)\}\}/.test(node.nodeValue)) {
                    let text = RegExp.$1.trim(); // 获取匹配到的字符串
                    new Watcher(vm, node, text, 'nodeValue');
                }
                break;

            // 处理 <input type="text" v-model="message">
            case 1:
                const attrs = node.attributes;
                for (const { nodeName, nodeValue } of attrs) {
                    // 获取v-model绑定的属性名
                    if (nodeName === 'v-model') {
                        node.addEventListener('input', function (e) {
                            console.log('input event--------------');
                            // 给相应的data属性赋值，进而触发该属性的set方法
                            vm[nodeValue] = e.target.value;
                        });
                        // 将node上指令值绑定watcher和响应式数据联接
                        new Watcher(vm, node, nodeValue, 'value');
                    }
                }
                break;

            default:
                break;
        }
    }

}