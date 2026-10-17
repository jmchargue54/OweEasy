import * as server from '../entries/pages/groups/join/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/join/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/join/+page.server.js";
export const imports = ["_app/immutable/nodes/4.n89EPx6E.js","_app/immutable/chunks/D_2TWl6e.js","_app/immutable/chunks/dU_bGZrZ.js","_app/immutable/chunks/BmXaIVsW.js","_app/immutable/chunks/BHDqMuN8.js","_app/immutable/chunks/0EIR70kx.js","_app/immutable/chunks/DQip_cuf.js"];
export const stylesheets = ["_app/immutable/assets/4.Dz3RAyt4.css"];
export const fonts = [];
