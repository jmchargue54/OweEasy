import { a6 as attr, e as escape_html, a9 as ensure_array_like, a8 as bind_props } from "../../../../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let share;
    let data = $$props["data"];
    let form = $$props["form"];
    let amount = 0;
    let selectedMembers = data.group.members.map((member) => member.id);
    share = selectedMembers.length ? (Number(0) / selectedMembers.length).toFixed(2) : "0.00";
    $$renderer2.push(`<div class="narrow svelte-4gdqzj"><a${attr("href", "/groups/" + data.group.id)}>← Back to ${escape_html(data.group.name)}</a><div class="card form-card svelte-4gdqzj"><p class="eyebrow svelte-4gdqzj">${escape_html(data.group.name)}</p><h1>Add an expense</h1>`);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--><form method="POST" class="svelte-4gdqzj"><label>Description<input name="description" placeholder="e.g. Groceries" required=""/></label><div class="two svelte-4gdqzj"><label>Amount (USD)<input name="amount" type="number" min="0.01" step="0.01"${attr("value", amount)} required=""/></label><label>Date<input name="date" type="date"${attr("value", (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))} required=""/></label></div><label>Category<select name="category">`);
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`Other`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`Groceries`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`Utilities`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`Travel`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`Dining`);
    });
    $$renderer2.push(`</select></label><fieldset class="svelte-4gdqzj"><legend class="svelte-4gdqzj">Include members in this split</legend><!--[-->`);
    const each_array = ensure_array_like(data.group.members);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let member = each_array[$$index];
      $$renderer2.push(`<label class="member svelte-4gdqzj"><input type="checkbox" name="memberIds"${attr("value", member.id)}${attr("checked", selectedMembers.includes(member.id), true)} class="svelte-4gdqzj"/>${escape_html(member.name)}</label>`);
    }
    $$renderer2.push(`<!--]--><small>Select everyone who should share this expense.</small></fieldset><div class="preview svelte-4gdqzj"><b>Equal-split preview</b><span class="svelte-4gdqzj">$${escape_html(share)} per member</span><small class="svelte-4gdqzj">Splits are stored as whole cents so they always total exactly.</small></div><button class="button">Save expense</button></form></div></div>`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
