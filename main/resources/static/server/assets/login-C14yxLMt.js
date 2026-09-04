import { n as Route } from "./router-Csma4Bf1.js";
import { n as AuthButton, t as AuthInput } from "./AuthInput-BW8w0CMs.js";
import { t as AuthWindow } from "./AuthWindow-CFsluwDt.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/login.tsx?tsr-split=component
function Login() {
	const { error } = Route.useSearch();
	return /* @__PURE__ */ jsxs(AuthWindow, { children: [/* @__PURE__ */ jsxs("form", {
		method: "post",
		action: "http://auth.local.test:9000/spring/login",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx(AuthInput, {
				name: "username",
				placeholder: "Username"
			}),
			/* @__PURE__ */ jsx(AuthInput, {
				name: "password",
				type: "password",
				placeholder: "Password"
			}),
			error !== void 0 && /* @__PURE__ */ jsx("p", {
				className: "text-center text-sm font-medium text-red-600",
				children: "invalid credentials"
			}),
			/* @__PURE__ */ jsx(AuthButton, {
				type: "submit",
				children: "Log in"
			})
		]
	}), /* @__PURE__ */ jsx("div", {
		className: "pt-2 text-center",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/register",
			className: "text-sm font-medium text-coffee-light hover:underline",
			children: "Create an account"
		})
	})] });
}
//#endregion
export { Login as component };
