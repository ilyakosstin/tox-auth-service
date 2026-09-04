//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/__root.tsx",
		children: [
			"/",
			"/account",
			"/login",
			"/register"
		],
		preloads: [
			"/assets/index-BcNJrF-U.js",
			"/assets/jsx-runtime-BkSabwWG.js",
			"/assets/useStore-D0ZA7xG-.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BcNJrF-U.js"
		} }]
	},
	"/": {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-CVIYuMSu.js"]
	},
	"/account": {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/account.tsx",
		children: ["/account/settings", "/account/"],
		preloads: ["/assets/account-Df1e-4ry.js", "/assets/Branding-D59E_r8I.js"]
	},
	"/login": {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/login.tsx",
		children: void 0,
		preloads: [
			"/assets/login-4q7Ro6Nc.js",
			"/assets/AuthInput-BwgUe6PV.js",
			"/assets/AuthWindow-Lv_j_yX6.js"
		]
	},
	"/register": {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/register.tsx",
		children: void 0,
		preloads: [
			"/assets/register-CoVOEypB.js",
			"/assets/AuthInput-BwgUe6PV.js",
			"/assets/AuthWindow-Lv_j_yX6.js"
		]
	},
	"/account/settings": {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/account/settings.tsx",
		children: void 0,
		preloads: ["/assets/settings-ndGDz0QI.js", "/assets/AuthInput-BwgUe6PV.js"]
	},
	"/account/": {
		filePath: "/home/ilya/Desktop/distributedAuthTest/auth_frontend/src/routes/account/index.tsx",
		children: void 0,
		preloads: ["/assets/account-B8V5mfF2.js"]
	}
} });
//#endregion
export { tsrStartManifest };
