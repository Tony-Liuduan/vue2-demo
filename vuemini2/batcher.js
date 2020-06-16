/**
 * @fileoverview 批处理模块
 * @author liuduan
 * @Date 2020-06-14 16:42:35
 * @LastEditTime 2020-06-14 17:30:00
 */

let timerFunc
let pending = false;

class Batcher {
    constructor() {
        this.reset();
        const p = Promise.resolve()
        timerFunc = () => {
            p.then(() => {
                this.flush();
            });
        }
    }

    /**
    * 批处理重置
    */
    reset() {
        this.has = {};
        this.queue = [];
    }

    /**
    * 将事件添加到队列中
    * @param job {Watcher} Watcher实例
    */
    push(job) {
        let jobId = job.id;

        if (!this.has[jobId]) {
            this.has[jobId] = true;

            this.queue.push(job);

            if (!pending) {
                pending = true;
                timerFunc();
            }
        }
    }

    /**
    * 执行并清空事件队列
    */
    flush() {
        pending = false;
        console.log('flush event--------------');
        this.queue.forEach((job) => {
            job.cb();
        });
        this.reset();
    }

}


export const batcher = new Batcher();