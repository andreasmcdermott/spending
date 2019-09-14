<script>
  import Input from "./Input.svelte";
  import Label from "./Label.svelte";

  export let label;
  export let name;
  export let value = "";
  export let displayLabel = true;

  const id = label.toLowerCase().replace(/\s+/g, "-");
</script>

{#if displayLabel}
  <Label for={id}>{label}</Label>
{/if}
<Input {id} {name} {value} />
