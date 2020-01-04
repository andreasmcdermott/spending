<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from './fns';
  export let to;
  export let block = false;
  export let styles = '';

  const dispatch = createEventDispatcher();
</script>

<button
  class={`text-left ${block ? 'block w-full' : 'inline-block'} ${styles}`}
  on:click={() => {
    dispatch('click');
    goto(to);
  }}>
  <slot />
</button>
