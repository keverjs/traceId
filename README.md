# traceId
kever 插件 生成traceId 挂载到context上

## 使用方式

```ts
import { createApp } from '@kever/core'

createApp({
  port: 9000,
  plugins: [
    '@kever/traceid'
  ]
})
```