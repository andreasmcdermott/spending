<script>
  import { getAccountById } from "../accounts/store";
  import Header from "../elements/Header.svelte";
  export let id;

  $: account = getAccountById(id) || {};
</script>

<Header>{account.name}</Header>
