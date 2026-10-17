import { e as escape_html, a6 as attr, a9 as ensure_array_like, aa as attr_class, a8 as bind_props } from "../../../../chunks/index.js";
import { d as dollars } from "../../../../chunks/format.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    $$renderer2.push(`<div class="heading svelte-1lkhai4"><div><a href="/dashboard">← Dashboard</a><h1 class="svelte-1lkhai4">${escape_html(data.group.name)}</h1><p class="muted svelte-1lkhai4">${escape_html(data.group.memberCount)} member${escape_html(data.group.memberCount === 1 ? "" : "s")}</p></div><div class="heading-actions svelte-1lkhai4">`);
    if (data.group.isCreator) {
      $$renderer2.push(`<!--[0--><a class="button secondary"${attr("href", "/groups/" + data.group.id + "/settings")}>Group settings</a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--><a class="button"${attr("href", "/groups/" + data.group.id + "/expenses/new")}>+ Add expense</a></div></div> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (form?.success) {
      $$renderer2.push(`<!--[0--><p class="success svelte-1lkhai4" role="status">${escape_html(form.success)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.group.isCreator && data.joinRequests.length) {
      $$renderer2.push(`<!--[0--><section class="card requests svelte-1lkhai4"><div class="title svelte-1lkhai4"><h2 class="svelte-1lkhai4">Join requests</h2><span class="muted svelte-1lkhai4">Only you can approve these</span></div><!--[-->`);
      const each_array = ensure_array_like(data.joinRequests);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let joinRequest = each_array[$$index];
        $$renderer2.push(`<div class="request svelte-1lkhai4"><span class="svelte-1lkhai4"><b>${escape_html(joinRequest.name)}</b><small class="svelte-1lkhai4">${escape_html(joinRequest.email)}</small></span><span class="request-actions svelte-1lkhai4"><form method="POST" action="?/approve" class="svelte-1lkhai4"><input type="hidden" name="requestId"${attr("value", joinRequest.id)}/><button class="button svelte-1lkhai4" type="submit">Approve</button></form><form method="POST" action="?/decline" class="svelte-1lkhai4"><input type="hidden" name="requestId"${attr("value", joinRequest.id)}/><button class="button secondary svelte-1lkhai4" type="submit">Decline</button></form></span></div>`);
      }
      $$renderer2.push(`<!--]--></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="card svelte-1lkhai4"><div class="title svelte-1lkhai4"><h2 class="svelte-1lkhai4">Expenses</h2><span class="muted svelte-1lkhai4">Track who has paid</span></div>`);
    if (data.expenses.length) {
      $$renderer2.push(`<!--[0--><!--[-->`);
      const each_array_1 = ensure_array_like(data.expenses);
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let e = each_array_1[$$index_2];
        $$renderer2.push(`<div class="expense svelte-1lkhai4"><div class="expense-main svelte-1lkhai4"><span class="svelte-1lkhai4"><b>${escape_html(e.description)}</b><small class="svelte-1lkhai4">${escape_html(e.date)} · paid by ${escape_html(e.payerName)}</small></span><strong class="svelte-1lkhai4">${escape_html(dollars(e.amount))}</strong></div><div class="expense-actions svelte-1lkhai4"><a class="button secondary"${attr("href", "/groups/" + data.group.id + "/expenses/" + e.id + "/edit")}>Edit</a><span class="muted svelte-1lkhai4">${escape_html(e.splits.filter((split) => split.paid).length)}/${escape_html(e.splits.length)} paid</span></div><div class="payments svelte-1lkhai4"><b class="svelte-1lkhai4">Members who have paid</b><!--[-->`);
        const each_array_2 = ensure_array_like(e.splits);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let split = each_array_2[$$index_1];
          $$renderer2.push(`<form method="POST" action="?/togglePaid" class="svelte-1lkhai4"><input type="hidden" name="expenseId"${attr("value", e.id)}/><input type="hidden" name="memberId"${attr("value", split.userId)}/><button${attr_class("payment svelte-1lkhai4", void 0, { "paid": split.paid })} type="submit"${attr("aria-pressed", split.paid)}><span class="checkbox svelte-1lkhai4">${escape_html(split.paid ? "✓" : "")}</span>${escape_html(split.name)}<small class="svelte-1lkhai4">${escape_html(dollars(split.shareCents))}</small></button></form>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="empty svelte-1lkhai4"><p>No expenses yet. Add the first shared cost.</p><a class="button secondary"${attr("href", "/groups/" + data.group.id + "/expenses/new")}>Add expense</a></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
