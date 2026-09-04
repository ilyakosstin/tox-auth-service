import { t as Branding } from "./Branding-D6zu8GP8.js";
import { Outlet } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/AppHeader.tsx
function AppHeader() {
	return /* @__PURE__ */ jsx("header", {
		className: "bg-coffee-light",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4",
			children: /* @__PURE__ */ jsx(Branding, { size: "sm" })
		})
	});
}
//#endregion
//#region src/routes/account.tsx?tsr-split=component
function AccountLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-coffee-light",
		children: [/* @__PURE__ */ jsx(AppHeader, {}), /* @__PURE__ */ jsx("main", {
			className: "mx-auto w-full max-w-3xl px-6 py-8",
			children: /* @__PURE__ */ jsx("div", {
				className: "rounded-xl bg-white p-8 shadow-md",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})
		})]
	});
}
//#endregion
export { AccountLayout as component };
