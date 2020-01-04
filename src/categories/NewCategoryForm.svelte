<script>
  import { createEventDispatcher } from 'svelte';
  import Form from '../elements/Form.svelte';
  import Field from '../elements/Field.svelte';
  import Button from '../elements/Button.svelte';
  import CategoryTypePicker from './CategoryTypePicker.svelte';
  import { createCategory } from './store';

  const dispatch = createEventDispatcher();

  function onNewCategory({ detail: { values, reset } }) {
    if (!values.name || !values.type) return;
    const id = createCategory(values);
    reset();
    dispatch('created', { id });
  }
</script>

<Form on:submit={onNewCategory}>
  <div class="flex flex-col h-full">
    <div>
      <Field label="New category" name="name" />
    </div>
    <div class="mt-4">
      <CategoryTypePicker name="type" />
    </div>
    <div class="mt-auto">
      <Button type="submit">Create Category</Button>
    </div>
  </div>
</Form>
