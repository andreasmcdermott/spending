<script>
  import store from "./store";
  export let to;
  export let block = false;
  export let styles = "";
</script>

<button
  class={`text-left ${block ? 'block w-full' : 'inline-block'} ${styles}`}
  on:click={() => ($store = to)}>
  <slot />
</button>
