/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-10 15:55:09
 * @LastEditTime 2020-06-10 16:57:36
 */
const { observe } = require('./observer');


/* object测试 */
let obj = {
    a: {
        b: 1,
    },
};
observe(obj);
obj.a.b = 2;
obj.a.b = {
    c: 1,
}
obj.a.b.c = 2;


/* array测试 */
let arr = [1, 2, 3];
observe(arr);

arr[2] = 3;
arr[2];

arr.push(1);
arr.unshift(1);
arr.reverse();
arr.pop();
arr.shift();