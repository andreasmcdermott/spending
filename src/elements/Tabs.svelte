<script>
  export let items;
  export let props;

  let selected = items[0];
</script>

<div>
  <ul class="flex p-0 m-0 border-b border-gray-400">
    {#each items as item}
      <li class="ml-2">
        <button
          class="py-2 px-4 -mb-px border border-gray-400 rounded rounded-b-none bg-gray-100"
          style={selected === item ? 'border-bottom-color: white; background-color: white;' : ''}
          on:click={() => (selected = item)}>
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
  {#if selected}
    <div class="pt-2">
      <svelte:component this={selected.component} {...props} />
    </div>
  {/if}
</div>
