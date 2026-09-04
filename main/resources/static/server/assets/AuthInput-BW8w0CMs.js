import { jsx } from "react/jsx-runtime";
//#region src/components/AuthButton.tsx
function AuthButton({ children, type = "button" }) {
	return /* @__PURE__ */ jsx("button", {
		type,
		className: "w-full rounded-lg bg-coffee-light py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-coffee-light/90",
		children
	});
}
//#endregion
//#region src/components/AuthInput.tsx
function AuthInput({ type = "text", placeholder, ...rest }) {
	return /* @__PURE__ */ jsx("input", {
		type,
		placeholder,
		className: "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-coffee-light focus:outline-none",
		...rest
	});
}
//#endregion
export { AuthButton as n, AuthInput as t };
