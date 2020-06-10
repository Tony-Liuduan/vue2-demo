/**
 * @fileoverview 工具方法集合
 * @author liuduan
 * @Date 2020-06-10 15:53:41
 * @LastEditTime 2020-06-10 16:55:58
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}


function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}


function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        configurable: true,
        writable: true,
        enumerable: !!enumerable,
        value: val,
    })
}

module.exports = {
    isObject,
    isPlainObject,
    def,
};