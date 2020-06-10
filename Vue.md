# Vue 源码

### 1. 源码结构

* banchmarks - 跑分

* dist - 打包出来的文件

  * common

  * esm

  * no

  * runtime Vue运行时，执行生命周期

  * complier

    * 离线编译

    * 在线编译，通过浏览器js解析模板渲染 

    * ```js
      new Vue({
        // 这种template需要js在线编译
        template: "<div>1</div>"
      })
      ```

* example - 样例

* flow - 类型规范

  * 是基于js的一个框架
  * 不通于ts，ts是一种语言
  * 作用相同，规范变量类型

* package - 单独需要发布的包，多包管理工具 by lerna

  * ssr：vue-server-renderer
    * <font color='red'>node vm ??</font>

* scripts - 打包脚本

* **src** - 核心代码

  * **core** - runtime
    * components
      * keep-live
    * global-api 全局api
    * instance - 实例方法属性，生命周期处理
    * observer
    * util
    * vdom
  * compiler - 在线编译template
  * platforms - 平台
    * compiler
    * runtime - 平台下对core runtime对补充
  * server
  * sfc
  * shared

### 2. 数据代理

#### 2.1 Object.defineProperty	

* 作用：把数据变为响应式数据

* 数组的监听
  * 能监听原有**数组**变化，但是不能监听新增元素的变化
  * unshift 触发的是数组的移动，会触发多次get set过程
  * push 不能触发原有数组变化，不能监听到新增元素
* getter 触发收集依赖添加到dep列表中（订阅事件）
* setter 触发dep去通知所有依赖watcher更新 （派发事件）

#### 2.2 Observer

* 数据监听，实现双向数据绑定
* 把数据变为可响应数据 by Object.defineProperty
  * new Observer(data)
* 实现手段：dep 
* 设计模式：订阅

#### 2.3 dep - 订阅类

	* 数据依赖，维护数据依赖的watcher:[]

	* 相当于一个订阅器，记录所有订阅的watcher
	* dep拿到observer的通知后，会查询所有订阅的watcher，发送更新通知
	* 内部实现就是一个监听器模式，添加依赖到数组，需要分发时调用notify去遍历数组，调用依赖的update方法

#### 2.3 watcher

 * 每个v-x指令对应一个watcher
 * watcher收到更新通知后会调用v-x指令，去

#### 2.5 指令v-x





## Vue2思想



## Vue2设计



## Vue3

