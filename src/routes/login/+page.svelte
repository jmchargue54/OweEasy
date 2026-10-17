<script>
  export let form;
  export let data;
</script>

<div class="auth card">
  <p class="eyebrow">Welcome back</p>
  <h1>Log in to OweEasy</h1>
  {#if form?.error}
    <p class="error" role="alert">{form.error}</p>
  {/if}
  {#if data?.oauthError}
    <p class="error" role="alert">{data.oauthError}</p>
  {/if}
  <form method="POST">
    <label>Email<input name="email" type="email" autocomplete="email" required /></label>
    <label
      >Password<input
        name="password"
        type="password"
        autocomplete="current-password"
        required
      /></label
    >
    <button class="button">Log in</button>
  </form>
  <div class="todo">
    <b>Student-owned feature:</b> Google sign-in is intentionally reserved for you. See the TODO
    in the server action and the implementation plan.
  </div>
  <div class="oauth-divider">or</div>

    <a class="button google-button" href="/auth/google">
    Continue with Google
    </a>
  <p>New here? <a href="/signup">Create an account</a></p>
</div>

<style>
  .auth {
    margin: 4rem auto;
    max-width: 440px;
  }
  .auth h1 {
    font-size: 2.3rem;
  }
  .auth form {
    display: grid;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .auth p:last-child {
    color: #58746b;
  }
  .eyebrow {
    color: #d26d35;
    font-weight: 800;
    text-transform: uppercase;
  }
  .todo {
    background: #fff8ed;
    border: 1px solid #f1d5a8;
    border-radius: 9px;
    color: #795526;
    font-size: 0.9rem;
    padding: 0.75rem;
  }
  .oauth-divider {
    color: #58746b;
    margin: 1rem 0;
    text-align: center;
  }

  .google-button {
    background: #4285f4;
    text-align: center;
    text-decoration: none;
    width: 100%;
  }
</style>
