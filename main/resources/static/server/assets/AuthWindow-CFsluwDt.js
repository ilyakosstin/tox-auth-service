import { t as Branding } from "./Branding-D6zu8GP8.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/AuthWindow.tsx
function AuthWindow({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-coffee-light px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-sm rounded-xl bg-gray-100 p-8 shadow-xl",
			children: [/* @__PURE__ */ jsx(Branding, {}), /* @__PURE__ */ jsx("div", {
				className: "mt-8 space-y-4",
				children
			})]
		})
	});
}
//#endregion
export { AuthWindow as t };
