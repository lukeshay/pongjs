import { pathToRegexp } from "path-to-regexp";

type RouteHandler<E> = (request: Request, env: E) => Promise<Response> | Response;

type RoutePath = RegExp | string;

type Method = "DELETE" | "GET" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";

type Route = {
	method: Method;
	path: RegExp;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handler: RouteHandler<any>;
};

class Router {
	#routes: Route[] = [];

	public add<E>(method: Method, path: RoutePath, handler: RouteHandler<E>) {
		this.#routes.push({
			handler,
			method,
			path: typeof path === "string" ? pathToRegexp(path) : path,
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public fetch(request: Request, env: any) {
		const { pathname } = new URL(request.url);
		const match = this.#routes.find(({ method, path }) => request.method === method && path.test(pathname));

		if (!match) {
			return new Response("Not found", {
				status: 404,
				statusText: "Not found",
			});
		}

		return match.handler(request, env);
	}
}

const router = new Router();

export { type Method, type RouteHandler, type RoutePath, router };