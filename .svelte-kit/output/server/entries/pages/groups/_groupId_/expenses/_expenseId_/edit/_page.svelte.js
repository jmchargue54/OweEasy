import { a6 as attr, e as escape_html, a9 as ensure_array_like, a8 as bind_props } from "../../../../../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let share;
    let data = $$props["data"];
    let form = $$props["form"];
    let amount = (data.expense.amount / 100).toFixed(2);
    let selectedMembers = data.expense.splits.map((split) => split.userId);
    share = selectedMembers.length ? (Number(amount || 0) / selectedMembers.length).toFixed(2) : "0.00";
    $$renderer2.push(`<div class="narrow svelte-bmtjqp"><a${attr("href", "/groups/" + data.group.id)}>← Back to ${escape_html(data.group.name)}</a> <div class="card form-card svelte-bmtjqp"><p class="eyebrow svelte-bmtjqp">${escape_html(data.group.name)}</p> <h1>Edit expense</h1> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="svelte-bmtjqp"><label>Description<input name="description"${attr("value", data.expense.description)} required=""/></label> <div class="two svelte-bmtjqp"><label>Amount (USD)<input name="amount" type="number" min="0.01" step="0.01"${attr("value", amount)} required=""/></label> <label>Date<input name="date" type="date"${attr("value", data.expense.date)} required=""/></label></div> <label>Category`);
    $$renderer2.select({ name: "category", value: data.expense.category }, ($$renderer3) => {
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Other`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Groceries`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Utilities`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Travel`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Dining`);
      });
    });
    $$renderer2.push(`</label> <fieldset class="svelte-bmtjqp"><legend class="svelte-bmtjqp">Include members in this split</legend> <!--[-->`);
    const each_array = ensure_array_like(data.group.members);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let member = each_array[$$index];
      $$renderer2.push(`<label class="member svelte-bmtjqp"><input type="checkbox" name="memberIds"${attr("value", member.id)}${attr("checked", selectedMembers.includes(member.id), true)} class="svelte-bmtjqp"/>${escape_html(member.name)}</label>`);
    }
    $$renderer2.push(`<!--]--> <small>Select everyone who should share this expense.</small></fieldset> <div class="preview svelte-bmtjqp"><b>Equal-split preview</b> <span class="svelte-bmtjqp">$${escape_html(share)} per member</span> <small class="svelte-bmtjqp">Updating the split recalculates each member's share.</small></div> <button class="button" type="submit">Save changes</button></form> <form method="POST" class="svelte-bmtjqp"><input type="hidden" name="intent" value="remove"/> <button class="button danger svelte-bmtjqp" type="submit">Delete expense</button></form></div></div>`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
