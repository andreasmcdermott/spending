<script>
  import PeriodPicker from '../accounts/PeriodPicker.svelte';
  import DoughnutChart from '../elements/DoughnutChart.svelte';
  import { getTransactionsForAccount } from '../transactions/store';
  import { filterByCategoryType, getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';
  import CategoryTypes from '../enums/category-types';
  import { createCachedStore } from '../utils/cachedStore';

  export let id;
  const period = createCachedStore('account-summary-selected-period', '');

  const getInitialDataPerCategory = data => {
    if (!$period) return {};

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

  $: periodData = getTransactionsForAccount(id, 'period');
  let expensesByCategory = [];

  $: {
    periodData.applyFilter({ period: parseInt($period, 10) });
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
  <PeriodPicker {id} value={$period} showPrevNext={true} on:change={e => ($period = e.detail)} />
  {#if $period}
    <DoughnutChart title="Expenses per Category" data={expensesByCategory} />
  {/if}
</div>
