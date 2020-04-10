<script>
  import { createEventDispatcher } from 'svelte';
  import { createSlugFromName } from '../utils/fns';

  const dispatch = createEventDispatcher();

  export let items;
  export let props;
  export let selectedId = '';

  const map = items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

  let selected = map[selectedId || items[0].id];
</script>

<div>
  <ul class="flex p-0 m-0 border-b border-gray-400">
    {#each items as item}
      <li class="ml-2">
        <button
          class="py-2 px-4 -mb-px border border-gray-400 rounded rounded-b-none bg-gray-100"
          style={selected === item ? 'border-bottom-color: white; background-color: white;' : ''}
          on:click={() => {
            selected = item;
            dispatch('select', item.id);
          }}>
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
