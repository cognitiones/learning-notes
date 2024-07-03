## 两数之和

![image-20240701140307753](http://cdn.chen-zeqi.cn/image-20240701140307753.png)

```ts
function twoSum(nums: number[], target: number): number[] { 
    const numToIndex = new Map<number, number>()

    for(let i = 0; i< nums.length; i++){
        const complement = target - nums[i]
        if(numToIndex.has(complement)){
            return [numToIndex.get(complement)!, i]
        }

        numToIndex.set(nums[i], i)
    }

    return []
}
```

**解析**

1、创建一个key value 值为 number 的哈希表

2、用 目标值 和 当前值 相减 取出 补充值，判断补充值是否在哈希表里

3、有则 返回，无则把当前值 存储在哈希表中

4、数组中没有对应值 则返回 []

## 回文数

![image-20240701161704765](http://cdn.chen-zeqi.cn/image-20240701161704765.png)

```ts
function isPalindrome(x: number): boolean {
    if(x < 0 || (x % 10 === 0 && x !== 0)){
        return false
    }

    let revertedNumber = 0
    while(x > revertedNumber){
        revertedNumber = revertedNumber * 10 + x % 10
        x = Math.floor(x / 10)
    }
    
    return x === revertedNumber || x === Math.floor(revertedNumber / 10)
}
```

**解析**

1、判断极端条件：回文数不为负数，回文数尾数不能为0 （0 除外)

2、通过

```ts
let revertedNumber = 0;
while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + x % 10;
    x = Math.floor(x / 10);
}
```

来生成 反转数字的一半

revertedNumber 从 x % 10 开始加

x 用 Math.floor(x / 10) 开始减

最后判断 回文数为

偶数时用 x === revertedNumber 

奇数时用 x === Math.floor(revertedNumber / 10) 