<script>
  import { categories, updateCategory } from "../categories/store";
  import Form from "../elements/Form.svelte";
  import Field from "../elements/Field.svelte";
  import Label from "../elements/Label.svelte";
  import Select from "../elements/Select.svelte";
  import Button from "../elements/Button.svelte";

  function onNewFilter({ detail: { values, reset } }) {
    if (!values.description || !values.category) return;
    const category = $categories.find(c => c.id === values.category);
    if (!category) return;
    category.filters.push({ description: values.description });
    updateCategory(category);
    reset();
  }
</script>

<Form on:submit={onNewFilter}>
  <div class="flex flex-col">
    <div>
      <Field label="New Filter" name="description" />
    </div>
    <div class="mt-4">
      <Label for="new-filter-category">for Category</Label>
      <Select
        id="new-filter-category"
        name="category"
        class="outline-none border-gray-400 focus:border-blue-500 text-base p-2
        border-b-2">
        {#each $categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </Select>
    </div>
    <div class="mt-4">
      <Button type="submit">Add Filter</Button>
    </div>
  </div>
</Form>
