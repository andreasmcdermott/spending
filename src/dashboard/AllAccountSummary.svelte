<script>
  import { getAllYears } from '../transactions/store';
  import { getAllTransactionsInYear } from '../transactions/store';
  import YearPicker from '../elements/YearPicker.svelte';
  import YearlySummaryTable from './YearlySummaryTable.svelte';
  import YearlySummaryChart from './YearlySummaryChart.svelte';
  import { createCachedStore } from '../utils/cachedStore';

  const years = getAllYears();

  const year = createCachedStore('dashboard-year', '');

  $: transactions = getAllTransactionsInYear($year);
</script>

<YearPicker {years} value={$year} on:change={e => ($year = e.detail)} />
<YearlySummaryTable year={$year} {transactions} />
<YearlySummaryChart year={$year} {transactions} />
