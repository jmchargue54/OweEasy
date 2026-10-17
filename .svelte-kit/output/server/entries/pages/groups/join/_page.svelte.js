import { e as escape_html, a6 as attr, a9 as ensure_array_like, a8 as bind_props } from "../../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    $$renderer2.push(`<div class="page-intro svelte-pvzjlu"><div><a href="/dashboard">← Back to dashboard</a><p class="eyebrow svelte-pvzjlu">Find your people</p><h1 class="svelte-pvzjlu">Join a group</h1><p class="muted svelte-pvzjlu">Request to join an existing group. The group creator will approve your request before you can see its expenses.</p></div></div> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (form?.success) {
      $$renderer2.push(`<!--[0--><p class="success svelte-pvzjlu" role="status">${escape_html(form.success)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form class="search svelte-pvzjlu" method="GET"><label for="group-search" class="svelte-pvzjlu">Search group names</label><div class="svelte-pvzjlu"><input id="group-search" name="q"${attr("value", data.query)} placeholder="e.g. Apartment 4B" class="svelte-pvzjlu"/><button class="button secondary">Search</button></div></form> <section class="group-grid svelte-pvzjlu">`);
    if (data.groups.length) {
      $$renderer2.push(`<!--[0--><!--[-->`);
      const each_array = ensure_array_like(data.groups);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let group = each_array[$$index];
        $$renderer2.push(`<article class="card group-card svelte-pvzjlu"><div class="group-heading svelte-pvzjlu"><span class="avatar svelte-pvzjlu">${escape_html(group.name[0].toUpperCase())}</span><div><h2 class="svelte-pvzjlu">${escape_html(group.name)}</h2><p class="muted svelte-pvzjlu">Created by ${escape_html(group.creatorName)}</p></div></div><p class="member-count svelte-pvzjlu">${escape_html(group.memberCount)} member${escape_html(group.memberCount === 1 ? "" : "s")}</p>`);
        if (group.isMember) {
          $$renderer2.push(`<!--[0--><span class="status svelte-pvzjlu">You are already a member</span>`);
        } else if (group.requestStatus === "pending") {
          $$renderer2.push(`<!--[1--><span class="status svelte-pvzjlu">Request pending</span>`);
        } else {
          $$renderer2.push(`<!--[-1--><form method="POST" action="?/request"><input type="hidden" name="groupId"${attr("value", group.id)}/><button class="button">Request to join</button></form>`);
        }
        $$renderer2.push(`<!--]--></article>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="card empty svelte-pvzjlu"><p>No groups matched your search.</p><a href="/groups/join" class="button secondary">Show all groups</a></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
