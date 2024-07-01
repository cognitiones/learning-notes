# 题库

https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

目前将从 `简单 => 中等 => 困难` 顺序去刷

# 通用方法
## extends

```ts
interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
}

const myDog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever"
};

```

## keyof 

遍历对象元素  

```ts
type Person = {
    name: string;
    age: number;
    address: string;
};

type PersonKeys = keyof Person;  // "name" | "age" | "address"

```

遍历数组元素

```ts
type TupleToObject<T extends readonly (string | symbol | number)[]> = { 	[Key in T[number]]: Key
}
```

