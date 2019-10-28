<script>
  import store from "./store";
  export let to;
  export let block;
</script>

<button
  class={`text-left ${block ? 'block w-full' : 'inline-block'}`}
  on:click={() => ($store = to)}>
  <slot />
</button>
