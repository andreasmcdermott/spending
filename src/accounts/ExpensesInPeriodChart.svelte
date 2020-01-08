<script>
  import PeriodPicker from '../accounts/PeriodPicker.svelte';
  import DoughnutChart from '../elements/DoughnutChart.svelte';
  import { getTransactionsForAccount } from '../transactions/store';
  import { filterByCategoryType, getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';
  import CategoryTypes from '../enums/category-types';

  export let id;
  let period = '';

  const getInitialDataPerCategory = data => {
    if (!period) return {};

    return Object.values(data)
      .map(d => d.category)
      .reduce((acc, c) => {
        if (!acc[c]) {
          acc[c] = {
            label: getCategoryName(c),
            color: getCategoryColor(c),
            value: 0
          };
        }
        return acc;
      }, {});
  };

  const periodData = getTransactionsForAccount(id, 'period');
  let expensesByCategory = [];

  $: {
    periodData.applyFilter({ period: parseInt(period, 10) });
    expensesByCategory = Object.values(
      $periodData
        .filter(filterByCategoryType(CategoryTypes.Spending))
        .map(d => ({ value: getFormattedAmount(d), category: d.category }))
        .filter(d => d.value > 0)
        .reduce((acc, d) => {
          acc[d.category].value += d.value;
          return acc;
        }, getInitialDataPerCategory($periodData))
    );
  }
</script>

<div>
  <PeriodPicker {id} bind:value={period} showPrevNext={true} />
  {#if period}
    <DoughnutChart title="Expenses per Category" bind:data={expensesByCategory} />
  {/if}
</div>
