<script>
  import Label from '../elements/Label.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';

  export let name;
  export let selected = null;
</script>

<Label>Has negative spending?</Label>
<RadioPicker bind:name bind:selected types={{ Yes: 'yes', No: 'no' }} on:change />
