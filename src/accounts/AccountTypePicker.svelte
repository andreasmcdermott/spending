<script>
  import RadioPicker from '../elements/RadioPicker.svelte';
  import Label from '../elements/Label.svelte';
  import AccountTypes from '../enums/account-types';

  export let name;
  export let selected = null;
</script>

<Label>Account Type</Label>
<RadioPicker bind:name bind:selected types={AccountTypes} on:change />
