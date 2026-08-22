---
title:
  zh: "TypeScript 入门指南"
  en: "TypeScript Beginner's Guide"
description:
  zh: "为 JavaScript 开发者准备的 TypeScript 快速入门教程"
  en: "A quick start tutorial for JavaScript developers to learn TypeScript"
tags: ["TypeScript", "JavaScript", "Tutorial"]
date: 2026-02-05
draft: false
---

## 什么是 TypeScript？

TypeScript 是 JavaScript 的超集，它在 JavaScript 的基础上添加了类型系统。简单来说，TS = JS + Types。

## 为什么使用 TypeScript？

### 类型安全

```typescript
// JavaScript - 运行时才能发现错误
function add(a, b) {
  return a + b;
}
add(1, "2"); // 结果是 "12"，可能不是你想要的

// TypeScript - 编写时就能发现错误
function add(a: number, b: number): number {
  return a + b;
}
add(1, "2"); // 编译错误！
```

### 更好的开发体验

- 智能代码补全
- 即时错误提示
- 轻松重构代码
- 清晰的代码文档

## 基础类型

```typescript
// 基本类型
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3];

// 对象
interface Person {
  name: string;
  age: number;
}

// 函数
function greet(person: Person): string {
  return `Hello, ${person.name}!`;
}
```

## 学习建议

1. 先掌握 JavaScript 基础
2. 从简单的类型注解开始
3. 逐步学习接口和泛型
4. 在实际项目中应用

TypeScript 的学习曲线比较平缓，一旦掌握了基本概念，就能显著提升代码质量和开发效率。
