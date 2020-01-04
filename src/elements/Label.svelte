<script>
  let htmlFor = undefined;
  export { htmlFor as for };
</script>

<label class="block text-xs uppercase tracking-widest text-gray-700" for={htmlFor}>
  <slot />
</label>
