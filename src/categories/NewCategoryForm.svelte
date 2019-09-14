<script>
  import Form from "../elements/Form.svelte";
  import Field from "../elements/Field.svelte";
  import Button from "../elements/Button.svelte";
  import CategoryTypePicker from "./CategoryTypePicker.svelte";
  import { createCategory } from "./store";

  function onNewCategory({ detail: { values, reset } }) {
    if (!values.name || !values.type) return;
    createCategory(values);
    reset();
  }
</script>

<Form on:submit={onNewCategory}>
  <Field label="New category" name="name" />
  <span class="inline-block ml-8">
    <CategoryTypePicker name="type" />
  </span>
  <span class="ml-4">
    <Button type="submit">Create</Button>
  </span>
</Form>
