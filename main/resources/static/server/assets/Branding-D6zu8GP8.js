import { jsx, jsxs } from "react/jsx-runtime";
//#region src/assets/coffee-beans.png
var coffee_beans_default = "/assets/coffee-beans-KHl5L_Ap.png";
//#endregion
//#region src/components/Branding.tsx
function Branding({ size = "md" }) {
	const iconClass = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-7 w-7" : "h-10 w-10";
	const textClass = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-center gap-3",
		children: [/* @__PURE__ */ jsx("img", {
			src: coffee_beans_default,
			alt: "Coffee beans",
			className: `${iconClass} rounded-full object-cover`
		}), /* @__PURE__ */ jsx("span", {
			className: `${textClass} font-bold tracking-wide text-stone-800`,
			children: "Tox.ID"
		})]
	});
}
//#endregion
export { Branding as t };
