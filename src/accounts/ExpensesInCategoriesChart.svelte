<script>
  import MultiCategoryPicker from '../categories/MultiCategoryPicker.svelte';
  import YearPicker from './YearPicker.svelte';
  import LineChart from '../elements/LineChart.svelte';
  import { getTransactionsForAccount } from '../transactions/store';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryName, getCategoryColor } from '../utils/categories';
  import CategoryTypes from '../enums/category-types';

  export let id;

  let year = '';
  let categories = [];
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

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

  const categoryData = getTransactionsForAccount(id, 'category');
  let expensesByPeriod = [];

  $: {
    categoryData.applyFilter({ category: { $in: categories } });
    expensesByPeriod = Object.values(
      $categoryData
        .map(d => ({
          value: getFormattedAmount(d),
          category: d.category,
          month: d.period % 100
        }))
        .reduce((acc, d) => {
          acc[d.category].values[d.month] += d.value;
          return acc;
        }, getInitialData(categories))
    );
  }
</script>

<div>
  <div class="flex">
    <div class="mr-2">
      <YearPicker {id} bind:value={year} />
    </div>
    <MultiCategoryPicker bind:values={categories} categoryTypes={CategoryTypes.Spending} />
  </div>
  {#if categories.length}
    <LineChart title="Expenses per category" {labels} bind:data={expensesByPeriod} />
  {/if}
</div>
