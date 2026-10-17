import { e as escape_html, a8 as bind_props } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    let data = $$props["data"];
    $$renderer2.push(`<div class="auth card svelte-1x05zx6"><p class="eyebrow svelte-1x05zx6">Welcome back</p> <h1 class="svelte-1x05zx6">Log in to OweEasy</h1> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error svelte-1x05zx6" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data?.oauthError) {
      $$renderer2.push(`<!--[0--><p class="error svelte-1x05zx6" role="alert">${escape_html(data.oauthError)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="svelte-1x05zx6"><label>Email<input name="email" type="email" autocomplete="email" required=""/></label> <label>Password<input name="password" type="password" autocomplete="current-password" required=""/></label> <button class="button">Log in</button></form> <div class="todo svelte-1x05zx6"><b>Student-owned feature:</b> Google sign-in is intentionally reserved for you. See the TODO
    in the server action and the implementation plan.</div> <div class="oauth-divider svelte-1x05zx6">or</div> <a class="button google-button svelte-1x05zx6" href="/auth/google">Continue with Google</a> <p class="svelte-1x05zx6">New here? <a href="/signup">Create an account</a></p></div>`);
    bind_props($$props, { form, data });
  });
}
export {
  _page as default
};
