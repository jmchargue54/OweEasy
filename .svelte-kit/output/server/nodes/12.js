import * as server from '../entries/pages/signup/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/signup/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/signup/+page.server.js";
export const imports = ["_app/immutable/nodes/12.XztXIqwW.js","_app/immutable/chunks/D_2TWl6e.js","_app/immutable/chunks/dU_bGZrZ.js","_app/immutable/chunks/BmXaIVsW.js","_app/immutable/chunks/BHDqMuN8.js"];
export const stylesheets = ["_app/immutable/assets/12.Ce8uQEOl.css"];
export const fonts = [];
