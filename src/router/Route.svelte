<script>
  import store from "./store";
  export let path;
</script>

{#if $store === path}
  <slot />
{/if}
