import { e as escape_html, a8 as bind_props } from "../../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    $$renderer2.push(`<div class="narrow svelte-6jc48u"><a href="/dashboard">← Back to dashboard</a><div class="card form svelte-6jc48u"><p class="eyebrow svelte-6jc48u">Start a shared space</p><h1>Create a group</h1><p class="muted svelte-6jc48u">Make a group for a trip, household, or anything you share.</p>`);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--><form method="POST" class="svelte-6jc48u"><label>Group name<input name="name" placeholder="e.g. Apartment 4B" required=""/></label><button class="button">Create group</button></form></div></div>`);
    bind_props($$props, { form });
  });
}
export {
  _page as default
};
