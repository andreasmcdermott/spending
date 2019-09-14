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
  <div class="flex items-end">
    <div>
      <Field label="New category" name="name" />
    </div>
    <div class="flex flex-auto justify-between">
      <span class="flex items-center ml-8">
        <CategoryTypePicker name="type" />
      </span>
      <span class="ml-auto">
        <Button type="submit">Create</Button>
      </span>
    </div>
  </div>
</Form>
