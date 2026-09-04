import { HeadContent, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-Da0REGUU.css";
//#endregion
//#region src/routes/__root.tsx
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$5 = () => import("./routes-Cmc_uzpb.js");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/account.tsx
var $$splitComponentImporter$4 = () => import("./account-gff9tniV.js");
var Route$4 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$3 = () => import("./login-C14yxLMt.js");
var Route$3 = createFileRoute("/login")({
	validateSearch: (search) => ({ error: search.error === void 0 ? void 0 : String(search.error) }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/register.tsx
var $$splitComponentImporter$2 = () => import("./register-Cqck_IhU.js");
var Route$2 = createFileRoute("/register")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/account/index.tsx
var $$splitComponentImporter$1 = () => import("./account-ClTRWQ9X.js");
var Route$1 = createFileRoute("/account/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/account/settings.tsx
var $$splitComponentImporter = () => import("./settings-VQ0E4440.js");
var Route = createFileRoute("/account/settings")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AccountRoute = Route$4.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$6
});
var LoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$6
});
var RegisterRoute = Route$2.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$6
});
var AccountIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AccountRoute
});
var AccountRouteChildren = {
	AccountSettingsRoute: Route.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AccountRoute
	}),
	AccountIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AccountRoute: AccountRoute._addFileChildren(AccountRouteChildren),
	LoginRoute,
	RegisterRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter, Route$3 as n, router_exports as t };
