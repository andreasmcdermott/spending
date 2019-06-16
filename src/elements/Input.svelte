<script>
  export let id;
  export let name;
  export let type = null;
  export let value = "";
  export let size = 'base';

  const clazz = "w-64 outline-none border-gray-400 focus:border-blue-500";
  const sizeClazz = size === 'sm' ? 'text-sm px-2 py-1 border-b' : 'text-base p-2 border-b-2';
</script>

{#if type}
  <input class={`${clazz} ${sizeClazz}`} {id} {name} {type} {value} />
{:else}
  <input class={`${clazz} ${sizeClazz}`} {id} {name} type="text" bind:value={value} />
{/if}
