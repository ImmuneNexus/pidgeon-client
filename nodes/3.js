

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/client/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DMnHZsam.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.BwOLf_Nb.js"];
export const stylesheets = [];
export const fonts = [];
