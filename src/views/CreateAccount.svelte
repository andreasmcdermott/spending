<script>
  import Link from "../router/Link.svelte";
  import Header from "../elements/Header.svelte";

  import { createAccount } from "../accounts/store";

  let name = "";
  let type = null;

  const onCreateAccount = () => {
    createAccount({ name, type });
  };
</script>

<Header>Create Account</Header>
<form on:submit|preventDefault={onCreateAccount}>
  <label for="account-name">Name</label>
  <input id="account-name" type="text" bind:value={name} />

  <input id="type-checking" type="radio" bind:group={type} value="checking" />
  <label for="type-checking">Checking</label>
  <input id="type-savings" type="radio" bind:group={type} value="savings" />
  <label for="type-savings">Savings</label>
  <input
    id="type-creditcard"
    type="radio"
    bind:group={type}
    value="creditcard" />
  <label for="type-creditcard">Credit Card</label>

  <button type="submit">Create</button>
  <Link to="/">Cancel</Link>
</form>
