<script>
  import store from "./store";
  export let to;
</script>

<button on:click={() => ($store = to)}>
  <slot />
</button>
