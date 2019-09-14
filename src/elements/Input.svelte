<script>
  export let id;
  export let name;
  export let type = null;
  export let value = "";
  export let size = "base";
  export let width = "base";

  const widths = {
    xs: "w-24",
    sm: "w-40",
    base: "w-64"
  };

  const clazz = "outline-none border-gray-400 focus:border-blue-500";
  const widthClazz = widths[width] || width.base;
  const sizeClazz =
    size === "sm" ? "text-sm px-2 py-1 border-b" : "text-base p-2 border-b-2";
</script>

{#if type}
  <input
    class={`${clazz} ${sizeClazz} ${widthClazz}`}
    {id}
    {name}
    {type}
    {value}
    on:change />
{:else}
  <input
    class={`${clazz} ${sizeClazz} ${widthClazz}`}
    {id}
    {name}
    type="text"
    bind:value
    on:change />
{/if}
