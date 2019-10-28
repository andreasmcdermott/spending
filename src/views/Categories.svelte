<script>
  import NewCategoryForm from "../categories/NewCategoryForm.svelte";
  import NewFilterForm from "../categories/NewFilterForm.svelte";
  import CategoryList from "../categories/CategoryList.svelte";
  import Header from "../elements/Header.svelte";
  import Button from "../elements/Button.svelte";
</script>

<Header>Categories</Header>

<div class="flex">
  <div class="flex-none w-1/2 p-2">
    <NewCategoryForm />
  </div>
  <div class="flex-none w-1/2 p-2">
    <NewFilterForm />
  </div>
</div>

<CategoryList />
