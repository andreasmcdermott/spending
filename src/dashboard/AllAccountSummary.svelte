<script>
  import { getAllYears } from '../transactions/store';
  import { getAllTransactionsInYear } from '../transactions/store';
  import YearPicker from '../elements/YearPicker.svelte';
  import YearlySummaryTable from './YearlySummaryTable.svelte';
  import YearlySummaryChart from './YearlySummaryChart.svelte';

  const years = getAllYears();

  let year;

  $: transactions = getAllTransactionsInYear(year);
</script>

<YearPicker {years} bind:value={year} />
<YearlySummaryTable {year} {transactions} />
<YearlySummaryChart {year} {transactions} />
