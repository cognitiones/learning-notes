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