import { e as escape_html, a9 as ensure_array_like, a6 as attr, a8 as bind_props } from "../../../chunks/index.js";
import { d as dollars } from "../../../chunks/format.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<div class="heading svelte-x1i5gj"><div><p class="eyebrow svelte-x1i5gj">Your overview</p><h1 class="svelte-x1i5gj">Good to see you, ${escape_html(data.user.name.split(" ")[0])}.</h1><p class="muted svelte-x1i5gj">Keep your groups moving and your balances clear.</p></div><div class="heading-actions svelte-x1i5gj"><a class="button secondary" href="/groups/join">Join group</a><a class="button" href="/groups/new">+ New group</a></div></div> <section class="grid svelte-x1i5gj"><div class="card"><div class="title svelte-x1i5gj"><h2 class="svelte-x1i5gj">Your groups</h2><a href="/groups/new" class="svelte-x1i5gj">Create one</a></div>`);
    if (data.groups.length) {
      $$renderer2.push(`<!--[0--><!--[-->`);
      const each_array = ensure_array_like(data.groups);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let group = each_array[$$index];
        $$renderer2.push(`<a class="group svelte-x1i5gj"${attr("href", "/groups/" + group.id)}><span class="avatar svelte-x1i5gj">${escape_html(group.name[0].toUpperCase())}</span><span class="svelte-x1i5gj"><b>${escape_html(group.name)}</b><small class="svelte-x1i5gj">${escape_html(group.memberCount)} member${escape_html(group.memberCount === 1 ? "" : "s")}</small></span><span class="svelte-x1i5gj">→</span></a>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="empty svelte-x1i5gj"><p>You haven't joined a group yet.</p><a class="button secondary" href="/groups/join">Join a group</a></div>`);
    }
    $$renderer2.push(`<!--]--></div><div class="card"><div class="title svelte-x1i5gj"><h2 class="svelte-x1i5gj">Recent expenses</h2></div>`);
    if (data.expenses.length) {
      $$renderer2.push(`<!--[0--><!--[-->`);
      const each_array_1 = ensure_array_like(data.expenses);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let e = each_array_1[$$index_1];
        $$renderer2.push(`<div class="expense svelte-x1i5gj"><span class="svelte-x1i5gj"><b>${escape_html(e.description)}</b><small class="svelte-x1i5gj">${escape_html(e.groupName)} · ${escape_html(e.date)}</small></span><strong class="svelte-x1i5gj">${escape_html(dollars(e.amount))}</strong></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="empty svelte-x1i5gj"><p>Your recent expenses will appear here.</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
