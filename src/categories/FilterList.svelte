<script>
  import FilterItem from "./FilterItem.svelte";

  export let filters;
</script>

<ul class="mt-2">
  {#each filters as filter}
    <li class="flex justify-between bg-gray-100 text-gray-800 my-1 px-2">
      <FilterItem bind:filter on:change />
    </li>
  {:else}
    <em class="text-gray-600">No filters yet</em>
  {/each}
</ul>
