<script>
  import { removeCategory } from "./store";
  import CategoryTypePicker from "../categories/CategoryTypePicker.svelte";
  import ColorPicker from "../elements/ColorPicker.svelte";
  import Button from "../elements/Button.svelte";

  export let category;

  const compareTypeToStr = {
    "=": "equals",
    "<": "less than",
    ">": "greater than"
  };
</script>

<h2 class="font-bold">{category.name}</h2>
<div class="py-2 px-3 bg-gray-100 border-gray-300 border">
  <div class="flex justify-between">
    <CategoryTypePicker name={`type-${category.id}`} selected={category.type} />
    <span class="ml-6">
      <ColorPicker color={category.color} />
    </span>
    <span class="ml-6">
      <Button size="sm" on:click={() => removeCategory(category.id)}>
        Remove
      </Button>
    </span>
  </div>
</div>
<ul class="mt-2">
  {#each category.filters || [] as filter}
    <li>
      <span>{filter.description}</span>
      <span>
        {filter.amount ? `${filter.amount.type} ${filter.amount.value}` : 'N/A'}
      </span>
    </li>
  {:else}
    <em class="text-gray-600">No filters yet</em>
  {/each}
</ul>
