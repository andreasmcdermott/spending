<script>
  import Link from '../router/Link.svelte';
  import Button from '../elements/Button.svelte';
  import Form from '../elements/Form.svelte';
  import Field from '../elements/Field.svelte';
  import Label from '../elements/Label.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';
  import AccountTypePicker from './AccountTypePicker.svelte';
  import FlipAmountPicker from './FlipAmountPicker.svelte';
  import { goto } from '../router/fns';
  import { createAccount } from './store';

  const onCreateAccount = ({ detail: { values, reset } }) => {
    if (!values.name || !values.type || !values.flipAmount) return;

    const id = createAccount(values);
    goto(`/accounts/${id}`);
  };
</script>

<div>
  <Form on:submit={onCreateAccount}>
    <div>
      <div>
        <Field label="Name" name="name" />
      </div>
    </div>
    <div class="mt-4">
      <AccountTypePicker name="type" />
    </div>
    <div class="mt-4">
      <FlipAmountPicker name="flipAmount" />
    </div>
    <div class="mt-4">
      <Button type="submit">Create</Button>
      <span class="ml-2">
        <Link to="/">Cancel</Link>
      </span>
    </div>
  </Form>
</div>
