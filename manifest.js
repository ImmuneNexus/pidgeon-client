export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["encoderWorker.min.js","favicon.png"]),
	mimeTypes: {".js":"text/javascript",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DsyiYWkd.js","app":"_app/immutable/entry/app.NQVTu6mg.js","imports":["_app/immutable/entry/start.DsyiYWkd.js","_app/immutable/chunks/entry.Cf8YTAWv.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.NQVTu6mg.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.BwOLf_Nb.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
