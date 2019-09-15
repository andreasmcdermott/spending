<script>
  import { createEventDispatcher } from "svelte";
  import RadioPicker from "../elements/RadioPicker.svelte";
  import AccountTypes from "../enums/account-types";

  export let name;
  export let selected = null;
</script>

<RadioPicker bind:name bind:selected types={AccountTypes} on:change />
