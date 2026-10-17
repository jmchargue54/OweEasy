import { a5 as head, a6 as attr, e as escape_html, a7 as slot, a8 as bind_props } from "../../chunks/index.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>OweEasy — shared expenses, made clear</title>`);
      });
      $$renderer3.push(`<meta name="description" content="A simple group expense tracker for roommates and friends."/>`);
    });
    $$renderer2.push(`<header class="site-header svelte-12qhfyh"><a class="brand svelte-12qhfyh"${attr("href", data.user ? "/dashboard" : "/")}><span class="brand-mark svelte-12qhfyh">$</span> OweEasy</a>`);
    if (data.user) {
      $$renderer2.push(`<!--[0--><nav class="svelte-12qhfyh"><a href="/dashboard" class="svelte-12qhfyh">Dashboard</a><a href="/groups/new" class="svelte-12qhfyh">New group</a><a class="notifications-link svelte-12qhfyh" href="/notifications">Notifications`);
      if (data.unreadNotifications) {
        $$renderer2.push(`<!--[0--><span class="notification-count svelte-12qhfyh">${escape_html(data.unreadNotifications)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></a><form method="POST" action="/logout"><button class="link-button svelte-12qhfyh">Log out</button></form></nav>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header><main class="svelte-12qhfyh"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main>`);
    bind_props($$props, { data });
  });
}
export {
  _layout as default
};
