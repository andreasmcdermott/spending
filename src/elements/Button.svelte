<script>
  export let type = "button";
  export let size = "base";

  const primaryColors =
    "bg-blue-300 hover:bg-blue-200 text-blue-800 border-blue-700 hover:border-blue-600";
  const secondaryColors =
    "bg-gray-400 hover:bg-gray-300 text-gray-800 border-gray-600 hover:border-gray-500";
  const sizeClasses =
    size === "sm"
      ? "text-sm px-2 py-1 border-b"
      : "text-base px-4 py-2 border-b-2";
</script>

<button
  class={`uppercase tracking-widest ${sizeClasses} ${type === 'submit' ? primaryColors : secondaryColors}`}
  {type}
  on:click>
  <slot />
</button>
