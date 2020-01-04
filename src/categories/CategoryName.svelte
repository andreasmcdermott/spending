<script>
  import { categories } from './store';
  export let id;

  $: name = ($categories.find(c => c.id === id) || {}).name;
</script>

{name}
