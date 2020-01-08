<script>
  import Select from '../elements/Select.svelte';
  import Button from '../elements/Button.svelte';
  import Icon from '../elements/Icon.svelte';
  import { getAllPeriodsForAccount } from '../transactions/store';

  export let id;
  export let value = '';
  export let showPrevNext = false;

  const periods = getAllPeriodsForAccount(id);
  $: first = parseInt(periods[0], 10);
  $: last = parseInt(periods[periods.length - 1], 10);
</script>

<div class="flex items-center">
  {#if showPrevNext}
    <div class="mr-2">
      <Button
        size="sm"
        on:click={() => {
          if (value) {
            let num = parseInt(value, 10);
            if (Number.isInteger(num)) {
              value = String(Math.max(num - 1, first));
            }
          }
        }}>
        <Icon name="arrow-left" label="Previous" />
      </Button>
    </div>
  {/if}
  <Select bind:value on:change>
    <option value="">Select period</option>
    {#each periods as period}
      <option value={period}>{period}</option>
    {/each}
  </Select>
  {#if showPrevNext}
    <div class="ml-2">
      <Button
        size="sm"
        on:click={() => {
          if (value) {
            let num = parseInt(value, 10);
            if (Number.isInteger(num)) {
              value = String(Math.min(num + 1, last));
            }
          } else {
            value = String(first);
          }
        }}>
        <Icon name="arrow-right" label="Next" />
      </Button>
    </div>
  {/if}
</div>
