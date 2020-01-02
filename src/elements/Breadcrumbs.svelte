<script>
  import Link from '../router/Link.svelte';
  import Icon from './Icon.svelte';

  export let items;
</script>

<div class="flex items-center">
  {#each items as item, i}
    {#if item.to}
      <Link styles="uppercase tracking-widest" to={item.to}>{item.name}</Link>
    {:else}
      <span>{item.name}</span>
    {/if}

    {#if i < items.length - 1}
      <span class="mx-4">
        <Icon name="chevron-right" />
      </span>
    {/if}
  {/each}
</div>
