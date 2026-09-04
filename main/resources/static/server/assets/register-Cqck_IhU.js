import { n as AuthButton, t as AuthInput } from "./AuthInput-BW8w0CMs.js";
import { t as AuthWindow } from "./AuthWindow-CFsluwDt.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/register.tsx?tsr-split=component
function Register() {
	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const username = String(formData.get("username") ?? "");
		const password = String(formData.get("password") ?? "");
		const email = String(formData.get("email") ?? "");
		const profileName = String(formData.get("profileName") ?? "");
		const body = {
			username,
			password
		};
		if (email) body.email = email;
		if (profileName) body.profileName = profileName;
		const response = await fetch("http://auth.local.test:9000/api/register", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (response.status === 200) {
			const data = await response.json();
			window.location.href = data.redirect_uri;
		}
	}
	return /* @__PURE__ */ jsxs(AuthWindow, { children: [/* @__PURE__ */ jsxs("form", {
		className: "space-y-4",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ jsx(AuthInput, {
				name: "username",
				placeholder: "Username"
			}),
			/* @__PURE__ */ jsx(AuthInput, {
				name: "email",
				placeholder: "Email (optional)"
			}),
			/* @__PURE__ */ jsx(AuthInput, {
				name: "profileName",
				placeholder: "Profile name (optional)"
			}),
			/* @__PURE__ */ jsx(AuthInput, {
				name: "password",
				type: "password",
				placeholder: "Password"
			}),
			/* @__PURE__ */ jsx(AuthInput, {
				name: "repeatPassword",
				type: "password",
				placeholder: "Repeat password"
			}),
			/* @__PURE__ */ jsx(AuthButton, {
				type: "submit",
				children: "Register"
			})
		]
	}), /* @__PURE__ */ jsx("div", {
		className: "pt-2 text-center",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/login",
			className: "text-sm font-medium text-coffee-light hover:underline",
			children: "I already have an account"
		})
	})] });
}
//#endregion
export { Register as component };
