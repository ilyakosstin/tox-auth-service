import { n as AuthButton, t as AuthInput } from "./AuthInput-BW8w0CMs.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/account/settings.tsx?tsr-split=component
function AccountSettings() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-xl font-bold text-gray-800",
				children: "Account settings"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(AuthInput, { placeholder: "Username" }),
					/* @__PURE__ */ jsx(AuthInput, { placeholder: "Email" }),
					/* @__PURE__ */ jsx(AuthInput, { placeholder: "Profile name" })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 border-t border-gray-200 pt-6",
				children: [
					/* @__PURE__ */ jsx(AuthButton, { children: "Change avatar" }),
					/* @__PURE__ */ jsx(AuthButton, { children: "Change password" }),
					/* @__PURE__ */ jsx(AuthButton, { children: "Delete account" }),
					/* @__PURE__ */ jsx(AuthButton, { children: "Log out" })
				]
			})
		]
	});
}
//#endregion
export { AccountSettings as component };
