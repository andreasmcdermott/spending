<script>
  import MultiCategoryPicker from '../categories/MultiCategoryPicker.svelte';
  import LineChart from '../elements/LineChart.svelte';
  import { shortMonths } from '../utils/date';
  import CategoryTypes from '../enums/category-types';
  import { getNameByValue } from '../utils/enums';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';
  import { createCachedStore } from '../utils/cachedStore';

  const labels = shortMonths;

  export let year;
  export let transactions;

  const selectedCategories = createCachedStore('dashboard-summary-selected-categories', []);

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

  $: summary = transactions
    .map(t => ({
      value: getFormattedAmount(t),
      category: t.category,
      year: Math.floor(t.period / 100),
      month: t.period % 100
    }))
    .reduce((acc, t) => {
      if (!acc[t.category]) return acc;
      acc[t.category].values[t.month] += t.value;
      return acc;
    }, getInitialData($selectedCategories));
  $: data = Object.values(summary || {});
</script>

<div class="w-full mt-8 pt-8 border-t">

  <MultiCategoryPicker
    values={$selectedCategories}
    categoryTypes={CategoryTypes.Spending}
    on:change={e => {
      $selectedCategories = e.detail;
    }} />

  <LineChart title="Summary per Category" {labels} {data} />

</div>
