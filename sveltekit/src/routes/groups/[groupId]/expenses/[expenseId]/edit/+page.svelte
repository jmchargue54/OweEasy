<script>
  export let data;
  export let form;
  let amount = (data.expense.amount / 100).toFixed(2);
  let selectedMembers = data.expense.splits.map((split) => split.userId);
  $: share = selectedMembers.length
    ? (Number(amount || 0) / selectedMembers.length).toFixed(2)
    : '0.00';
  function confirmDelete(event) {
    if (!confirm('Delete this expense?')) event.preventDefault();
  }
</script>

<div class="narrow">
  <a href={'/groups/' + data.group.id}>← Back to {data.group.name}</a>
  <div class="card form-card">
    <p class="eyebrow">{data.group.name}</p>
    <h1>Edit expense</h1>
    {#if form?.error}
      <p class="error" role="alert">{form.error}</p>
    {/if}
    <form method="POST">
      <label>Description<input name="description" value={data.expense.description} required /></label>
      <div class="two">
        <label
          >Amount (USD)<input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            bind:value={amount}
            required
        /></label>
        <label
          >Date<input name="date" type="date" value={data.expense.date} required /></label
        >
      </div>
      <label
        >Category<select name="category" value={data.expense.category}>
          <option>Other</option>
          <option>Groceries</option>
          <option>Utilities</option>
          <option>Travel</option>
          <option>Dining</option>
        </select></label
      >
      <fieldset>
        <legend>Include members in this split</legend>
        {#each data.group.members as member}
          <label class="member"
            ><input
              type="checkbox"
              name="memberIds"
              value={member.id}
              bind:group={selectedMembers}
            />{member.name}</label
          >
        {/each}
        <small>Select everyone who should share this expense.</small>
      </fieldset>
      <div class="preview">
        <b>Equal-split preview</b>
        <span>${share} per member</span>
        <small>Updating the split recalculates each member's share.</small>
      </div>
      <button class="button" type="submit">Save changes</button>
    </form>
    <form method="POST" onsubmit={confirmDelete}>
      <input type="hidden" name="intent" value="remove" />
      <button class="button danger" type="submit">Delete expense</button>
    </form>
  </div>
</div>

<style>
  .narrow {
    margin: 2rem auto;
    max-width: 650px;
  }
  .form-card {
    margin-top: 1.5rem;
  }
  .eyebrow {
    color: #d26d35;
    font-weight: 800;
    text-transform: uppercase;
  }
  .form-card form {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .two {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
  fieldset {
    border: 1px solid #dce8e3;
    border-radius: 8px;
    display: grid;
    gap: 0.6rem;
    padding: 1rem;
  }
  legend {
    color: #41645a;
    font-size: 0.9rem;
    font-weight: 700;
  }
  .member {
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }
  .member input {
    width: auto;
  }
  .preview {
    background: #e6f2ed;
    border-radius: 10px;
    color: #146c52;
    display: grid;
    gap: 0.3rem;
    padding: 1rem;
  }
  .preview span {
    font-size: 1.5rem;
    font-weight: 800;
  }
  .preview small {
    color: #41645a;
  }
  /* .form-actions {
    display: flex;
    gap: 0.75rem;
  } */
  .danger {
    background: #fff0ef;
    color: #9c332a;
  }
  @media (max-width: 600px) {
    .two {
      grid-template-columns: 1fr;
    }
    /* .form-actions {
      flex-direction: column;
    } */
  }
</style>
