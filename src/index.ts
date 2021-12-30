import { Context, Next } from '@kever/core'
import { BaseMiddleware, MType, Middleware } from '@kever/ioc'
import os from 'os'

declare module '@kever/core' {
  interface Context {
    traceId: string;
  }
}

let increasId = 1000

@Middleware('traceId', MType.Global)
export class TraceId implements BaseMiddleware<MType.Global> {
  async ready(ctx: Context, next: Next) {
    ctx.traceId = ctx.traceId ? ctx.traceId : this.createTraceId()
    await next()
  }

  // 生成规则是：服务器IP（16进制） + 生成时间 + 自增序列 + 当前进程号
  // 自增序列 1000 -> 9000，循环
  createTraceId() {
    if (increasId > 9000) {
      increasId = 1000
    }
    const hexIp = this.ipToHex(this.getIp())
    const time = Date.now()
    const traceId = `${hexIp}${time}${increasId}${process.pid}`
    increasId++
    return traceId
  }

  getIp() {
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
      const iface = interfaces[devName]
      if (!iface) {
        continue
      }
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
    return '127.0.0.1'
  }

  ipToHex(ip: string) {
    const buffer = Buffer.from(ip.split('.').map(Number))
    return buffer.toString('hex')
  }
}
