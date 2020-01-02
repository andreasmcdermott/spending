<script>
  import { goto } from './fns';
  export let to;
  export let block = false;
  export let styles = '';
</script>

<button
  class={`text-left ${block ? 'block w-full' : 'inline-block'} ${styles}`}
  on:click={() => goto(to)}>
  <slot />
</button>
