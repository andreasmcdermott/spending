<script>
  export let items;

  let selected = items[items.length - 1];
</script>

<div>
  <ul class="flex p-0 m-0">
    {#each items as item}
      <li>
        <button on:click={() => selected = item}>{item.label}</button>
      </li>
    {/each}
  </ul>
  {#if selected}
    <div>
      <svelte:component this={selected.component} {...selected.props} />
    </div>
  {/if}
</div>
