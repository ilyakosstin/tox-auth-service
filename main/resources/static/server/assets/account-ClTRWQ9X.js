import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/account/index.tsx?tsr-split=component
function AccountView() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-6",
		children: [/* @__PURE__ */ jsx("div", {
			className: "h-24 w-24 rounded-full bg-gray-200",
			"aria-label": "Avatar placeholder"
		}), /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-2xl font-bold text-gray-800",
				children: "Username placeholder"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-gray-500",
				children: "Profile name placeholder"
			})]
		})]
	});
}
//#endregion
export { AccountView as component };
