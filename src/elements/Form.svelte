<script>
  import { createEventDispatcher } from "svelte";
  import Header from "./Header.svelte";

  export let header = null;

  let form;
  const dispatch = createEventDispatcher();
  const dispatchSubmit = event => {
    const values = [...form.elements]
      .filter(el => Boolean(el.name))
      .reduce((acc, el) => {
        if (el.type === "file") {
          acc[el.name] = el.files;
          return acc;
        }
        if (el.type === "radio" && !el.checked) return acc;
        if (el.type === "checkbox") {
          if (!acc[el.name]) {
            acc[el.name] = [];
          }
          if (el.checked) {
            acc[el.name].push(el.value);
          }
          return acc;
        }
        acc[el.name] = el.value;
        return acc;
      }, {});
    dispatch("submit", { values, reset: () => form.reset(), event });
  };
</script>

<form
  class="p-4 bg-gray-200"
  bind:this={form}
  on:submit|preventDefault={dispatchSubmit}>
  {#if header}
    <Header size="sm">{header}</Header>
  {/if}
  <slot />
</form>
