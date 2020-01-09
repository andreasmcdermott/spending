<script>
  import { createEventDispatcher } from 'svelte';
  import { categories, updateCategory } from './store';
  import Form from '../elements/Form.svelte';
  import Field from '../elements/Field.svelte';
  import Label from '../elements/Label.svelte';
  import Select from '../elements/Select.svelte';
  import Button from '../elements/Button.svelte';
  import FilterAmountInput from './FilterAmountInput.svelte';
  import CategoryPicker from './CategoryPicker.svelte';

  const dispatch = createEventDispatcher();

  export let value = '';

  function onNewFilter({ detail: { values, reset } }) {
    if (!values.description || !values.category) return;
    const category = $categories.find(c => c.id === values.category);
    if (!category) return;
    let amount = null;
    if (values.type) {
      const type = values.type;
      let value = values.amount;
      value = parseInt(value, 10);
      if (!Number.isInteger(value)) {
        value = 0;
      }
      amount = { value, type };
    }
    category.filters.push({ description: values.description, amount });
    updateCategory(category);
    reset();
    dispatch('created', { categoryId: category.id });
  }
</script>

<Form on:submit={onNewFilter}>
  <div class="flex">
    <div class="flex flex-col">
      <div>
        <Field label="Match desription" name="description" bind:value />
      </div>
      <div class="mt-4">
        <Label for="new-filter-category">for Category</Label>
        <CategoryPicker />
      </div>
      <div class="mt-4">
        <Button type="submit">Add Filter</Button>
      </div>
    </div>
    <div class="ml-8">
      <FilterAmountInput label="Match amount" inputSize="normal" display="vertical" />
    </div>
  </div>
</Form>
