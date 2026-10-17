import * as server from '../entries/pages/notifications/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/11.D9iUeH1A.js","_app/immutable/chunks/D_2TWl6e.js","_app/immutable/chunks/dU_bGZrZ.js","_app/immutable/chunks/BmXaIVsW.js","_app/immutable/chunks/BHDqMuN8.js","_app/immutable/chunks/0EIR70kx.js","_app/immutable/chunks/DQip_cuf.js","_app/immutable/chunks/BtswaVFk.js"];
export const stylesheets = ["_app/immutable/assets/11.CiSjw5h8.css"];
export const fonts = [];
