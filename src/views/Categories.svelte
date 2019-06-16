<script>
  import { categories } from "../categories/store";
  import NewCategoryForm from "../categories/NewCategoryForm.svelte";
  import CategoryTypePicker from '../categories/CategoryTypePicker.svelte';
  import Header from "../elements/Header.svelte";
  import ColorPicker from '../elements/ColorPicker.svelte';

  const compareTypeToStr = { '=': 'equals', '<': 'less than', '>': 'greater than' };
</script>

<Header>Categories</Header>

<NewCategoryForm />

<ul>
  {#each $categories as category}
    <li class="px-4 py-2">
      <h2 class="font-bold">{category.name}</h2>
      <div class="flex">
        <CategoryTypePicker name={`type-${category.id}`} selected={category.type} />
        <span class="ml-6">
        <ColorPicker color={category.color} />
        </span>
      </div>
      <ul>
        {#each category.filters as filter}
          <li>
            <span>{filter.description}</span>
            <span>
               {filter.amount ? `${filter.amount.type} ${filter.amount.value}` : 'N/A'}
            </span>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
