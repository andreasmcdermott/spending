<script>
  import { createEventDispatcher } from 'svelte';
  import Input from '../elements/Input.svelte';
  import Button from '../elements/Button.svelte';
  import Label from '../elements/Label.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';
  import ComparisonTypes from '../enums/comparison-types';

  const dispatch = createEventDispatcher();

  export let type = null;
  export let amount = '';
  export let inputSize = 'sm';
  export let display = 'horizontal';
  export let label = null;

  const handleChange = () => {
    dispatch('change', { amount, type });
  };
</script>

<div class="flex flex-none flex-col">
  {#if label}
    <Label>{label}</Label>
  {/if}
  <div class="flex">
    <div class="flex {display === 'vertical' ? 'flex-col' : 'flex-row'}">
      <RadioPicker
        name="type"
        types={ComparisonTypes}
        bind:selected={type}
        on:change={handleChange} />
    </div>
    <div>
      <Input
        name="amount"
        size={inputSize}
        width="xs"
        placeholder="Amount"
        bind:value={amount}
        on:input={handleChange} />
    </div>
  </div>
</div>
