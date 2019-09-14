<script>
  import { categories } from "../categories/store";
  import CategoryItem from "../categories/CategoryItem.svelte";
</script>

<ul>
  {#each $categories as category (category.id)}
    <li class="px-4 py-2">
      <CategoryItem {category} />
    </li>
  {/each}
</ul>
