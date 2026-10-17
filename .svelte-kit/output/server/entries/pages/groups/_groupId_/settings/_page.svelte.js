import { a6 as attr, e as escape_html, a9 as ensure_array_like, a8 as bind_props } from "../../../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    $$renderer2.push(`<div class="narrow svelte-12u5zmm"><a${attr("href", "/groups/" + data.group.id)}>← Back to ${escape_html(data.group.name)}</a><div class="card form-card svelte-12u5zmm"><p class="eyebrow svelte-12u5zmm">Group settings</p><h1>${escape_html(data.group.name)}</h1>`);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (form?.success) {
      $$renderer2.push(`<!--[0--><p class="success svelte-12u5zmm" role="status">${escape_html(form.success)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--><section class="svelte-12u5zmm"><h2 class="svelte-12u5zmm">Group name</h2><form method="POST" action="?/rename" class="svelte-12u5zmm"><label>Name<input name="name"${attr("value", data.group.name)} minlength="2" required=""/></label><button class="button" type="submit">Save name</button></form></section><section class="svelte-12u5zmm"><h2 class="svelte-12u5zmm">Members</h2><p class="muted svelte-12u5zmm">Remove someone when they should no longer have access to this group.</p><div class="members svelte-12u5zmm"><!--[-->`);
    const each_array = ensure_array_like(data.group.members);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let member = each_array[$$index];
      $$renderer2.push(`<div class="member svelte-12u5zmm"><span class="svelte-12u5zmm"><b>${escape_html(member.name)}</b>`);
      if (member.isCreator) {
        $$renderer2.push(`<!--[0--><small class="svelte-12u5zmm">Group creator</small>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span>`);
      if (!member.isCreator) {
        $$renderer2.push(`<!--[0--><form method="POST" action="?/removeMember" class="svelte-12u5zmm"><input type="hidden" name="memberId"${attr("value", member.id)}/><button class="button danger svelte-12u5zmm" type="submit">Remove</button></form>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></section></div></div>`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
