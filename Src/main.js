var Koa = require('koa')
var send = require('koa-send')

console.log(`Start FrontEnd WebServer With Koa`)

const app = new Koa()

app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('./api') !== 0) {
    if (ctx.url === '/') {
      await send(ctx, 'index.html')
    } else {
      await send(ctx, ctx.url)
    }
  }
});

const port = 8888
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
