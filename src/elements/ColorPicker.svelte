<script>
  import { createEventDispatcher } from "svelte";
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import { getRandomColor } from "../enums/colors";

  export let id = "color";
  export let color = "black";
  export let name = "color";

  const dispatch = createEventDispatcher();

  const handleChange = e => {
    dispatch("change", color);
  };
</script>

<div class="flex items-center">
  <span
    class="mr-2 inline-block w-6 h-6"
    style={`background-color: ${color}`} />
  <Input
    size="sm"
    width="xs"
    {id}
    {name}
    bind:value={color}
    on:change={handleChange} />
  <span class="ml-2">
    <Button
      size="sm"
      on:click={() => {
        color = getRandomColor();
        handleChange();
      }}>
      Random
    </Button>
  </span>
</div>
