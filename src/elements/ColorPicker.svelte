<script>
  import Input from './Input.svelte'
  import Button from './Button.svelte'
  import {getRandomColor} from '../enums/colors';

  export let id = 'color';
  export let color = 'black';
  export let name = 'color';
</script>

<div class="flex items-center">
  <span class="mr-2 inline-block w-6 h-6" style={`background-color: ${color}`} />
  <Input size="sm" {id} {name} bind:value={color} />
  <span class="ml-2">
    <Button size="sm" on:click={() => {
      color = getRandomColor();
    }}>Random</Button>
  </span>
</div>