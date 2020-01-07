<script>
  import { categories } from './store';
  import MultiSelect from '../elements/MultiSelect.svelte';


  export let values = [];
  export let id = undefined;
  export let name = 'categories';
  export let categoryTypes = null;
  
  const filterByCategoryType = category => {
    if (!categoryTypes) return true;
    if (Array.isArray(categoryTypes)) return categoryTypes.includes(category);
    return categoryTypes === category.type;
  }
  const items = $categories.filter(filterByCategoryType).map(c => ({ id: c.id, label: c.name }));
</script>

<MultiSelect bind:values on:change {name} {id} {items} empty="Select categories" />