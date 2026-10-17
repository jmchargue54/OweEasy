import { e as escape_html, a8 as bind_props } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    $$renderer2.push(`<div class="auth card svelte-kmqcod"><p class="eyebrow svelte-kmqcod">Start tracking</p> <h1 class="svelte-kmqcod">Create your account</h1> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error svelte-kmqcod" role="alert">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="svelte-kmqcod"><label>Name<input name="name" autocomplete="name" required=""/></label> <label>Email<input name="email" type="email" autocomplete="email" required=""/></label> <label>Password<input name="password" type="password" minlength="8" autocomplete="new-password" required=""/><small class="svelte-kmqcod">Use at least 8 characters.</small></label> <button class="button">Create account</button></form> <div class="oauth-divider svelte-kmqcod">or</div> <a class="button google-button svelte-kmqcod" href="/auth/google">Continue with Google</a> <p class="svelte-kmqcod">Already have an account? <a href="/login">Log in</a></p></div>`);
    bind_props($$props, { form });
  });
}
export {
  _page as default
};
