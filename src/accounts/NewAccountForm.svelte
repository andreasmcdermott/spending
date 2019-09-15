<script>
  import Link from "../router/Link.svelte";
  import Button from "../elements/Button.svelte";
  import Form from "../elements/Form.svelte";
  import Field from "../elements/Field.svelte";
  import AccountTypePicker from "./AccountTypePicker.svelte";
  import { goto } from "../router/fns";

  import { createAccount } from "../accounts/store";

  const onCreateAccount = ({ detail: { values, reset } }) => {
    if (!values.name || !values.type) return;

    const id = createAccount(values);
    goto(`/${id}`);
  };
</script>

<Form on:submit={onCreateAccount}>
  <div class="flex items-end">
    <div>
      <Field label="Name" name="name" />
    </div>
    <div class="flex flex-auto justify-between">
      <span class="flex items-center ml-8">
        <AccountTypePicker name="type" />
      </span>
      <span class="ml-auto">
        <Button type="submit">Create</Button>
        <span class="ml-2">
          <Link to="/">Cancel</Link>
        </span>
      </span>
    </div>
  </div>
</Form>
