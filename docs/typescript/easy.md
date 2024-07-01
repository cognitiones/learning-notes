# 简单

## Pick

![image-20240607155550224](http://cdn.chen-zeqi.cn//1717746984077.jpg)

```ts
// answer
type MyPick<T, K extends keyof T> = { [key in K]: T[key] };
```

**解析:**

1、参数

pick 接收 两个参数 一个为 主类型 另一个为 选取类型（选取类型 必须继承 主类型， 选取类型 可以是 联合类型） `type MyPick<T, K extends keyof T>`

2、返回值

返回值为一个对象，因为 K 可以为 联合类型, 所以 key 值 所以要遍历 K 类型 `[S in K]`

value 为 T 类型当中的元素 所以为 `T[key]`

```ts
type MyPick<T, K extends keyof T> = { [key in K]: T[key] };
```

**测试用例:**

```ts
//测试工具
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Expect<T extends true> = T

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

//用例
interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}
```



## Readonly

![image-20240607155550224](http://cdn.chen-zeqi.cn//1718094560241.jpg)

```TS
//answer
type MyReadOnly<T> = { readonly [K in keyof T]: T[K] }
```

**解析:**

遍历 T类型 所有元素 加上 `readonly` 标签

**测试用例:**

```ts
//测试工具
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Expect<T extends true> = T

//用例
type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
  Expect<Equal<MyReadonly<1>, Readonly<1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
```

## Tuple to Object

![image-20240701105133408](http://cdn.chen-zeqi.cn/image-20240701105133408.png)

```ts
type TupleToObject<T extends readonly (string | symbol | number)[]> = {
    [Key in T[number]]: Key 
}
```

**解析**

1、数组 key值 有 string | Symbol |number 三种 所以用 readonly (string | symbol | number)[] 

2、T[number] 方法能遍历数组元素 用 [key in T[number]] 来输出 全部数组key值，value值 为 key 值

**测试用例**

```ts
//测试工具
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Expect<T extends true> = T

//用例
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1; [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
```

## First of Array

![image-20240701112838809](http://cdn.chen-zeqi.cn/image-20240701112838809.png)

```ts
//anwser
type First<T extends unknown[]> = T extends [infer F, ...infer Rest] ? F : never
```

**解析**

1、用 [infer F, ...infer Rest] 声明 第一个值 跟  其他值

2、用 T extends [infer F, ...infer Rest] ? F : never 判断 如果数组元素大于1 则返回 第一个值

**测试用例**

```ts
//测试工具
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Expect<T extends true> = T

//用例
type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
```

## Length of Tuple

![image-20240701112848973](http://cdn.chen-zeqi.cn/image-20240701112848973.png)

```ts
//answer
type Length<T extends readonly unknown[]> = T['length']
```

**解析**

1、数组长度为 可读 ，用 readonly unknown[] 声明

2、数组长度值 用 T['length'] 表示

**测试用例**

```ts
//测试工具
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Expect<T extends true> = T

//用例
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]
```

