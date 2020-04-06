<script>
  import { formatAmount } from '../utils/formatting';

  export let title;
  export let data;
  export let mapper = null;
  export let includeSubs = false;

  if (!mapper) mapper = amount => amount;
</script>

<div class="flex items-center border-b w-3/4">
  <span class="w-1/2">{title}:</span>
  <div class="w-1/2 text-lg text-right font-mono">{formatAmount(mapper(data.total))}</div>
</div>
{#if includeSubs}
  <div class="w-3/4">
    {#each Object.keys(data.subs) as sub}
      <div class="ml-4 flex items-center border-b">
        <span class="w-1/2 text-base">{sub}:</span>
        <div class="w-1/2 text-right font-mono text-gray-700">
          {formatAmount(mapper(data.subs[sub]))}
        </div>
      </div>
    {/each}
  </div>
{/if}
