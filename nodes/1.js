

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ek6PcZRO.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.BwOLf_Nb.js","_app/immutable/chunks/entry.Cf8YTAWv.js"];
export const stylesheets = [];
export const fonts = [];
