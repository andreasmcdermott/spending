<script>
  import Link from '../router/Link.svelte';
  import Button from '../elements/Button.svelte';
  import Form from '../elements/Form.svelte';
  import Field from '../elements/Field.svelte';
  import Label from '../elements/Label.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';
  import AccountTypePicker from '../accounts/AccountTypePicker.svelte';
  import FlipAmountPicker from '../accounts/FlipAmountPicker.svelte';
  import { goto } from '../router/fns';

  import { getAccountById, updateAccount } from '../accounts/store';

  export let id;

  const { name, type, flipAmount } = getAccountById(id);
  console.log(name, type, flipAmount);

  const onSaveAccount = ({ detail: { values, reset } }) => {
    if (!values.name || !values.type || !values.flipAmount) return;

    updateAccount(id, values);
    goto(`..`);
  };
</script>

<div>
  <Form on:submit={onSaveAccount}>
    <div>
      <div>
        <Field label="Name" name="name" value={name} />
      </div>
    </div>
    <div class="mt-4">
      <AccountTypePicker name="type" selected={type} />
    </div>
    <div class="mt-4">
      <FlipAmountPicker
        name="flipAmount"
        selected={flipAmount === true ? 'yes' : flipAmount === false ? 'no' : null} />
    </div>
    <div class="mt-4">
      <Button type="submit">Save</Button>
      <span class="ml-2">
        <Link to="..">Cancel</Link>
      </span>
    </div>
  </Form>
</div>
