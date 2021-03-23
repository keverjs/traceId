# traceId
kever 插件 生成traceId 挂载到context上

## 使用方式

```ts
//index.ts
import { createApp } from '@kever/core'

createApp({
  port: 9000,
  plugins: [
    '@kever/traceid'
  ]
})
```

```json
// tsconfig.json
{
  "compilerOptions": {
    // 添加
    "types": [
      "@kever/traceid"
    ],
}

```