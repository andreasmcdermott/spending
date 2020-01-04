<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../elements/Button.svelte';
  import Icon from '../elements/Icon.svelte';
  import Input from '../elements/Input.svelte';
  import FilterAmountInput from './FilterAmountInput.svelte';
  import ComparisonTypes from '../enums/comparison-types';
  import { getNameByValue } from '../utils/enums';

  export let filter;
  let isEditing = false;

  const dispatch = createEventDispatcher();

  const onChange = () => {
    if (!filter.amount) return;

    filter.amount.value = parseInt(filter.amount.value, 10);
    if (!Number.isInteger(filter.amount.value)) {
      filter.amount.value = 0;
    }

    if (typeof filter.amount.value === 'number' && typeof filter.amount.type === 'string') {
      isEditing = false;
      dispatch('change', filter);
    }
  };
</script>

<div class="flex justify-between">
  <span class="font-bold">{filter.description}</span>
  <span class="flex justify-end">
    {#if !isEditing}
      <div class="flex-none">
        {filter.amount ? `${getNameByValue(ComparisonTypes, filter.amount.type)} ${filter.amount.value}` : ''}
      </div>
      <div class="flex-none ml-4">
        <Button
          size="sm"
          on:click={() => {
            isEditing = true;
          }}>
          <Icon name="edit-2" label="Edit" />
        </Button>
      </div>
      <span class="flex-none ml-2">
        <Button size="sm" on:click={() => dispatch('remove', filter)}>
          <Icon name="trash" label="Remove" />
        </Button>
      </span>
    {:else}
      <FilterAmountInput
        type={filter.amount ? filter.amount.type : undefined}
        amount={filter.amount ? filter.amount.value : undefined}
        on:change={e => {
          filter.amount = { type: e.detail.type, value: e.detail.amount };
          console.log(filter);
        }} />
      <span class="flex-none ml-2">
        <Button type="submit" size="sm" on:click|preventDefault={onChange}>
          <Icon name="save" label="Save" />
        </Button>
      </span>
      <span class="flex-none ml-2">
        <Button
          size="sm"
          on:click={() => {
            isEditing = false;
          }}>
          <Icon name="x" label="Cancel" />
        </Button>
      </span>
    {/if}
  </span>
</div>
