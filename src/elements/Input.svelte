<script>
  export let id = undefined;
  export let name = undefined;
  export let type = null;
  export let value = '';
  export let placeholder = '';
  export let size = 'base';
  export let width = 'base';

  let el = null;

  export const focus = () => {
    el.focus();
  };

  const widths = {
    xs: 'w-24',
    sm: 'w-40',
    base: 'w-64',
    half: 'w-1/2',
    full: 'w-full'
  };

  const clazz = 'outline-none border-gray-400 focus:border-blue-500';
  const widthClazz = widths[width] || width.base;
  const sizeClazz = size === 'sm' ? 'text-sm px-2 py-1 border-b' : 'text-base p-2 border-b-2';
</script>

{#if type}
  <input
    bind:this={el}
    class={`${clazz} ${sizeClazz} ${widthClazz}`}
    {id}
    {name}
    {type}
    {value}
    {placeholder}
    on:change
    on:input
    on:keydown />
{:else}
  <input
    bind:this={el}
    class={`${clazz} ${sizeClazz} ${widthClazz}`}
    {id}
    {name}
    {placeholder}
    type="text"
    bind:value
    on:change
    on:input
    on:keydown />
{/if}
