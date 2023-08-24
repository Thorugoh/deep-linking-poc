/* routes.js */

import { Application, Router } from 'https://deno.land/x/oak/mod.ts'


const port = 8000

const app = new Application()
const router = new Router()

router.get('/', async (context) => {
  await context.send({ path: "/static/index.html", root: `${Deno.cwd()}/universalLinksServer` });
})

router.get('/screen/:id', async (context) => {
  await context.send({ path: "/static/index.html", root: `${Deno.cwd()}/universalLinksServer` });
})

router.get('/.well-known/assetlinks.json', async (context) => {
  context.response.headers.set("Content-Type", "application/json")
  await context.send({ path: "/.well-known/assetlinks.json", root: `${Deno.cwd()}/universalLinksServer`, hidden: true })
})

router.get('/apple-app-site-association', async (context) => {
    context.response.headers.set("Content-Type", "application/json")
    await context.send({ path: "/apple-app-site-association", root: `${Deno.cwd()}/universalLinksServer` })
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port })