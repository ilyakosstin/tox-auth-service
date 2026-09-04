import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=component
function Home() {
	return /* @__PURE__ */ jsxs("div", {
		className: "p-8",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "text-4xl font-bold",
			children: "Welcome to TanStack Start"
		}), /* @__PURE__ */ jsxs("p", {
			className: "mt-4 text-lg",
			children: [
				"Edit ",
				/* @__PURE__ */ jsx("code", { children: "src/routes/index.tsx" }),
				" to get started."
			]
		})]
	});
}
//#endregion
export { Home as component };
