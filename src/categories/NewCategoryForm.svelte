<script>
  import Form from "../elements/Form.svelte";
  import Field from "../elements/Field.svelte";
  import Button from "../elements/Button.svelte";
  import CategoryTypePicker from './CategoryTypePicker.svelte';

  function onNewCategory({ detail: { values, reset } }) {
    console.log(values);
    if (!values.name || !values.type) return;
    reset();
  }
</script>

<Form on:submit={onNewCategory}>
  <Field label="New category" name="name" />
  <span class="inline-block ml-8"><CategoryTypePicker name="type" /></span>
  <span class="ml-4"><Button type="submit">Create</Button></span>
</Form>
