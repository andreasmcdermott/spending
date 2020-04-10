<script>
  import MultiCategoryPicker from '../categories/MultiCategoryPicker.svelte';
  import YearPicker from './AccountYearPicker.svelte';
  import LineChart from '../elements/LineChart.svelte';
  import { getTransactionsForAccount } from '../transactions/store';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';
  import CategoryTypes from '../enums/category-types';
  import { shortMonths } from '../utils/date';
  import { createCachedStore } from '../utils/cachedStore';

  export let id;

  const labels = shortMonths;
  const year = createCachedStore('account-summary-selected-year', '');
  const selectedCategories = createCachedStore('account-summary-selected-categories', []);

  const getInitialData = categories => {
    if (!categories.length) return {};

    const initialDatas = categories.reduce((acc, c) => {
      acc[c] = { label: getCategoryName(c), color: getCategoryColor(c), values: {} };
      for (let i = 1; i <= 12; ++i) {
        acc[c].values[i] = 0;
      }
      return acc;
    }, {});

    return initialDatas;
  };

  let expensesByPeriod = [];
  $: data = getTransactionsForAccount(id, 'category');
  $: {
    const yearValue = parseInt($year, 10) * 100;
    data.applyFilter({
      category: { $in: $selectedCategories },
      period: { $between: [yearValue + 1, yearValue + 12] }
    });
    expensesByPeriod = Object.values(
      $data
        .map(d => ({
          value: getFormattedAmount(d),
          category: d.category,
          year: Math.floor(d.period / 100),
          month: d.period % 100
        }))
        .reduce((acc, d) => {
          acc[d.category].values[d.month] += d.value;
          return acc;
        }, getInitialData($selectedCategories))
    );
  }
</script>

<div>
  <div class="flex">
    <div class="mr-2">
      <YearPicker {id} value={$year} on:change={e => ($year = e.detail)} />
    </div>
    <MultiCategoryPicker
      values={$selectedCategories}
      categoryTypes={CategoryTypes.Spending}
      on:change={e => {
        $selectedCategories = e.detail;
      }} />
  </div>
  {#if $selectedCategories.length}
    <LineChart title="Expenses per category" {labels} data={expensesByPeriod} />
  {/if}
</div>
