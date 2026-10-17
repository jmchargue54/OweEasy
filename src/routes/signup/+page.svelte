<script>
  export let form;
</script>

<div class="auth card">
  <p class="eyebrow">Start tracking</p>
  <h1>Create your account</h1>
  {#if form?.error}
    <p class="error" role="alert">{form.error}</p>
  {/if}
  <form method="POST">
    <label>Name<input name="name" autocomplete="name" required /></label>
    <label>Email<input name="email" type="email" autocomplete="email" required /></label>
    <label
      >Password<input
        name="password"
        type="password"
        minlength="8"
        autocomplete="new-password"
        required
      /><small>Use at least 8 characters.</small></label
    >
    <button class="button">Create account</button>
  </form>
  <div class="oauth-divider">or</div>

    <a class="button google-button" href="/auth/google">
    Continue with Google
    </a>
  <p>Already have an account? <a href="/login">Log in</a></p>
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
  .auth small,
  .auth p:last-child {
    color: #58746b;
  }
  .eyebrow {
    color: #d26d35;
    font-weight: 800;
    text-transform: uppercase;
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
