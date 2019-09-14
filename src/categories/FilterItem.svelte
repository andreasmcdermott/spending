<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../elements/Button.svelte";

  export let filter;

  const dispatch = createEventDispatcher();

  const compareTypeToStr = {
    "=": "equals",
    "<": "less than",
    ">": "greater than"
  };
</script>

<span class="font-bold">{filter.description}</span>
<span>
  <span class="flex-none">
    {filter.amount ? `${compareTypeToStr[filter.amount.type]} ${filter.amount.value}` : 'N/A'}
  </span>
  <span class="flex-none ml-2">
    <Button size="sm" on:click={() => dispatch('remove', filter)}>x</Button>
  </span>
</span>
