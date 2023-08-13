const server = Deno.listen({ port: 8000 });

for await (const conn of server) {
  handleHttp(conn).catch(console.error)
}

async function handleHttp(conn:Deno.Conn) {
  const httpCon = Deno.serveHttp(conn);
  for await (const requestEvent of httpCon) {
    const url = 
    new URL(requestEvent.request.url);
    const filepath = decodeURIComponent(url.pathname);

    let file;
    try{
      file = await Deno.open("." + filepath, { read: true })
    }catch(err){
      const notFoundResponse = new Response("Not Found", { status: 404 })
      await requestEvent.respondWith(notFoundResponse)
      continue;
    }


    // Build a readable stream so the file doesn't have to be fully loaded into
    // memory while we send it
    const readableStream = file.readable;

    // Build and send the response
    const response = new Response(readableStream);
    await requestEvent.respondWith(response);
  }
}