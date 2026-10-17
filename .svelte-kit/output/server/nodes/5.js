import * as server from '../entries/pages/groups/new/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/new/+page.server.js";
export const imports = ["_app/immutable/nodes/5.DoCCNaKs.js","_app/immutable/chunks/D_2TWl6e.js","_app/immutable/chunks/dU_bGZrZ.js","_app/immutable/chunks/BmXaIVsW.js","_app/immutable/chunks/BHDqMuN8.js"];
export const stylesheets = ["_app/immutable/assets/5.BWuCAZZI.css"];
export const fonts = [];
