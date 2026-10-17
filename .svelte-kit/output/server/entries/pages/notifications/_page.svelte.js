import { e as escape_html, a9 as ensure_array_like, aa as attr_class, a6 as attr, a8 as bind_props } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    $$renderer2.push(`<div class="heading svelte-1ce0uvz"><div><p class="eyebrow svelte-1ce0uvz">Stay up to date</p><h1 class="svelte-1ce0uvz">Notifications</h1><p class="muted svelte-1ce0uvz">Join requests, approvals, and expenses that need your attention.</p></div>`);
    if (data.notifications.some((notification) => !notification.read)) {
      $$renderer2.push(`<!--[0--><form method="POST" action="?/markAllRead"><button class="button secondary" type="submit">Mark all as read</button></form>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (form?.success) {
      $$renderer2.push(`<!--[0--><p class="success svelte-1ce0uvz" role="status">${escape_html(form.success)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="card">`);
    if (data.notifications.length) {
      $$renderer2.push(`<!--[0--><!--[-->`);
      const each_array = ensure_array_like(data.notifications);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let notification = each_array[$$index];
        $$renderer2.push(`<article${attr_class("notification svelte-1ce0uvz", void 0, { "unread": !notification.read })}><div><a${attr("href", notification.href)} class="svelte-1ce0uvz"><b>${escape_html(notification.title)}</b></a><p class="svelte-1ce0uvz">${escape_html(notification.message)}</p><small class="svelte-1ce0uvz">${escape_html(new Date(notification.createdAt).toLocaleString())}</small></div>`);
        if (!notification.read) {
          $$renderer2.push(`<!--[0--><form method="POST" action="?/markRead" class="svelte-1ce0uvz"><input type="hidden" name="notificationId"${attr("value", notification.id)}/><button class="button secondary svelte-1ce0uvz" type="submit">Mark read</button></form>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></article>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="empty svelte-1ce0uvz"><p>You’re all caught up.</p></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data, form });
  });
}
export {
  _page as default
};
