/**
 * @fileoverview 订阅触发依赖器
 * @author liuduan
 * @Date 2020-06-12 10:20:03
 * @LastEditTime 2020-06-14 16:41:28
 */

export default class Dep {
    constructor() {
        this.subs = []; // 订阅依赖列表
    }

    addSub(sub) { // sub就是每个指令new的watcher
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach(sub => {
            // 触发订阅的watcher实例，更新dom value
            sub.update();
        });
    }
}