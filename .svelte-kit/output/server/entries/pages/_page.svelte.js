import { a6 as attr, e as escape_html, a8 as bind_props } from "../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<section class="hero svelte-1uha8ag"><div><p class="eyebrow svelte-1uha8ag">Shared expenses, made clear</p><h1 class="svelte-1uha8ag">Stop doing group math in a group chat.</h1><p class="lead svelte-1uha8ag">OweEasy keeps every expense traceable, splits costs evenly, and shows who owes whom at a glance.</p><div class="actions svelte-1uha8ag"><a class="button"${attr("href", data.user ? "/dashboard" : "/signup")}>${escape_html(data.user ? "Open dashboard" : "Get started free")}</a>`);
    if (!data.user) {
      $$renderer2.push(`<!--[0--><a class="button secondary" href="/login">Log in</a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div><div class="hero-card svelte-1uha8ag"><div>Your group total<strong class="svelte-1uha8ag">$248.00</strong></div><div class="row svelte-1uha8ag"><span>Alex paid</span><b>$124.00</b></div><div class="row svelte-1uha8ag"><span>Jordan owes</span><b>$62.00</b></div><div class="row svelte-1uha8ag"><span>Sam owes</span><b>$62.00</b></div></div></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
