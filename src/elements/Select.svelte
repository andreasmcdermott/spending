<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let name = undefined;
  export let value = '';
  export let placeholder = '';
  export let size = 'base';
  export let width = 'base';

  const widths = {
    xs: 'w-24',
    sm: 'w-40',
    base: 'w-64'
  };

  const clazz = 'outline-none border-gray-400 focus:border-blue-500';
  const widthClazz = widths[width] || width.base;
  const sizeClazz = size === 'sm' ? 'text-sm px-2 py-2 border-b' : 'text-base px-2 py-4 border-b-2';
</script>

<select
  {id}
  {name}
  bind:value
  on:change={e => dispatch('change', value)}
  class={`${clazz} ${widthClazz} ${sizeClazz}`}
  style={size === 'sm' ? 'height: 2rem;' : 'height: calc(2.75rem - 1px);'}>
  <slot />
</select>
