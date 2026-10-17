import * as server from '../entries/pages/groups/_groupId_/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/_groupId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/[groupId]/+page.server.js";
export const imports = ["_app/immutable/nodes/6.Dj1hXXrI.js","_app/immutable/chunks/D_2TWl6e.js","_app/immutable/chunks/dU_bGZrZ.js","_app/immutable/chunks/BmXaIVsW.js","_app/immutable/chunks/BHDqMuN8.js","_app/immutable/chunks/0EIR70kx.js","_app/immutable/chunks/DQip_cuf.js","_app/immutable/chunks/BtswaVFk.js","_app/immutable/chunks/DOaDHzRB.js"];
export const stylesheets = ["_app/immutable/assets/6.DVSfvRI4.css"];
export const fonts = [];
