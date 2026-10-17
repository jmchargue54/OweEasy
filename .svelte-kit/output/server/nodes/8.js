import * as server from '../entries/pages/groups/_groupId_/expenses/_expenseId_/edit/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/groups/_groupId_/expenses/_expenseId_/edit/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/groups/[groupId]/expenses/[expenseId]/edit/+page.server.js";
export const imports = ["_app/immutable/nodes/8.B10kGJAU.js","_app/immutable/chunks/D_2TWl6e.js","_app/immutable/chunks/dU_bGZrZ.js","_app/immutable/chunks/BmXaIVsW.js","_app/immutable/chunks/BHDqMuN8.js","_app/immutable/chunks/0EIR70kx.js","_app/immutable/chunks/DQip_cuf.js","_app/immutable/chunks/BoNqzI4T.js"];
export const stylesheets = ["_app/immutable/assets/8.CJUG9uKW.css"];
export const fonts = [];
