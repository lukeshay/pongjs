# Cloudflare Worker Router

A simple router for Cloudflare workers.

```ts
import { router } from "@pongjs/router";

export interface Env {
	DB: D1Database;
}

router.add("GET", "/hello/:name", async (request: Request, env: Env) => {
	return Response.json({
		message: `Hello, ${name}`,
	});
});

export default router;
```

See [path-to-regex](https://www.npmjs.com/package/path-to-regex) for how the paths work.
