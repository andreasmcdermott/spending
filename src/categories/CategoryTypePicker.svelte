<script>
  import { createEventDispatcher } from "svelte";
  import CategoryTypes from "../enums/category-types";
  import RadioPicker from "../elements/RadioPicker.svelte";

  export let name;
  export let selected = null;
</script>

<RadioPicker bind:name bind:selected types={CategoryTypes} on:change />
