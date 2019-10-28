<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../elements/Button.svelte";
  import Icon from "../elements/Icon.svelte";
  import Input from "../elements/Input.svelte";

  export let filter;
  let isEditing = false;

  const dispatch = createEventDispatcher();

  const compareTypeToStr = {
    "=": "equals",
    "<": "less than",
    ">": "greater than"
  };

  const onChange = e => {
    e.preventDefault();
    let amount = parseInt(e.target.elements.amount.value, 10);
    if (Number.isNaN(amount)) {
      amount = null;
    }
    const type = [...e.target.elements.type].reduce((prev, curr) => {
      if (prev) return prev;
      if (curr.checked) return curr.value;
      return null;
    }, null);

    if (amount !== null && type !== null) {
      filter.amount = { value: amount, type };
      isEditing = false;
      dispatch("change");
    }
  };
</script>

<div class="flex justify-between">
  <span class="font-bold">{filter.description}</span>
  <span class="flex justify-end">
    {#if !isEditing}
      <span class="flex-none">
        {filter.amount ? `${compareTypeToStr[filter.amount.type]} ${filter.amount.value}` : ''}
      </span>
      <span class="flex-none ml-2">
        <Button
          size="sm"
          on:click={() => {
            isEditing = true;
          }}>
          <Icon name="edit-2" label="Edit" />
        </Button>
      </span>
      <span class="flex-none ml-2">
        <Button size="sm" on:click={() => dispatch('remove', filter)}>
          <Icon name="trash" label="Remove" />
        </Button>
      </span>
    {:else}
      <form class="flex flex-none" on:submit={onChange}>
        {#each Object.keys(compareTypeToStr) as type}
          <label class="inline-block mr-4">
            <input
              type="radio"
              name="type"
              value={type}
              checked={filter.amount && filter.amount.type === type} />
            {type}
          </label>
        {/each}
        <span>
          <Input
            name="amount"
            size="sm"
            width="xs"
            placeholder="Amount"
            value={filter.amount ? filter.amount.value : ''} />
        </span>
        <span class="flex-none ml-2">
          <Button type="submit" size="sm">
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
      </form>
    {/if}
  </span>
</div>
