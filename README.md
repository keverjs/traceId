
a kever global plugin, generate traceid and mount it to context.



## Install

> npm install @kever/traceid --save

## Start

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
    "types": [
      "@kever/traceid"
    ],
}

```