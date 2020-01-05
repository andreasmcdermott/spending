<script>
  import LineChart from '../elements/LineChart.svelte';
  import DoughnutChart from '../elements/DoughnutChart.svelte';
  import PeriodPicker from '../accounts/PeriodPicker.svelte';
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import { getTransactionForAccount } from '../transactions/store';
  import CategoryTypes from '../enums/category-types';
  import { filterByCategoryType, getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';

  export let id;

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

  getInitialDataPerCategory = data => {
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

  let category = '';
  let period = '';

  const categoryData = getTransactionForAccount(id, 'category');
  const periodData = getTransactionForAccount(id, 'period');

  let expensesByCategory = [];
  let expensesByPeriod = [];

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
  <div class="flex flex-col">
    <div>
      <div class="flex jusitfy-end">
        <div class="mr-2">
          <PeriodPicker {id} bind:value={period} on:change={() => (category = '')} />
        </div>
        <div>
          <CategoryPicker bind:value={category} on:change={() => (period = '')} />
        </div>
      </div>
      <div class="mt-2">
        {#if !!period}
          <DoughnutChart title="Expenses per Category" bind:data={expensesByCategory} />
        {:else if !!category}
          <LineChart
            title="Category Expense per period"
            label={getCategoryName(category)}
            bind:data={expensesByPeriod} />
        {:else}
          <p>Nothing sleecte</p>
        {/if}
      </div>
    </div>
  </div>
</div>
