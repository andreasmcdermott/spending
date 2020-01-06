<script>
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import LineChart from '../elements/LineChart.svelte';
  import { getTransactionForAccount } from '../transactions/store';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';

  export let id;

  let category = '';

  const getInitialDataPerPeriod = data => {
    if (!category) return {};

    let minPeriod = null;
    let maxPeriod = null;
    const periods = Object.values(data).forEach(d => {
      if (minPeriod === null || d.period < minPeriod) minPeriod = d.period;
      if (maxPeriod === null || d.period > maxPeriod) maxPeriod = d.period;
    });

    const initialData = {};
    for (let p = minPeriod; p <= maxPeriod; ++p) {
      initialData[p] = { label: String(p), color: getCategoryColor(category), value: 0 };
    }

    return initialData;
  };

  const categoryData = getTransactionForAccount(id, 'category');
  let expensesByPeriod = [];

  $: {
    categoryData.applyFilter({ category });
    expensesByPeriod = Object.values(
      $categoryData
        .map(d => ({
          value: getFormattedAmount(d),
          period: d.period
        }))
        .reduce((acc, d) => {
          acc[d.period].value += d.value;
          return acc;
        }, getInitialDataPerPeriod($categoryData))
    );
  }
</script>

<div>
  <CategoryPicker bind:value={category} />
  {#if category}
    <LineChart
      title="Expenses per category"
      label={getCategoryName(category)}
      bind:data={expensesByPeriod} />
  {/if}
</div>
