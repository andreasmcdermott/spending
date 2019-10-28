<script>
  import FilterItem from "./FilterItem.svelte";
  import { sortBy } from "../utils/fns";

  export let filters;
</script>

<ul class="mt-2">
  {#each filters.sort(sortBy('description')) as filter}
    <li class="bg-gray-100 text-gray-800 my-1 px-2">
      <FilterItem bind:filter on:change on:remove />
    </li>
  {:else}
    <em class="text-gray-600">No filters yet</em>
  {/each}
</ul>
