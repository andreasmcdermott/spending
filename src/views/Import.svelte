<script>
  import { getAccountById } from "../accounts/store";
  import Header from "../elements/Header.svelte";
  import Link from "../router/Link.svelte";
  import Icon from "../elements/Icon.svelte";

  export let id;

  $: account = getAccountById(id) || {};
</script>

<Header>
  <div class="flex items-center">
    <Link styles="uppercase tracking-widest" to={`/accounts/${id}`}>
      {account.name}
    </Link>
    <span class="mx-4">
      <Icon name="chevron-right" />
    </span>
    <span>Import</span>
  </div>
</Header>
