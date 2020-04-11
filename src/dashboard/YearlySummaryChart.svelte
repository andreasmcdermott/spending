<script>
  import LineChart from '../elements/LineChart.svelte';
  import { shortMonths } from '../utils/date';
  import CategoryTypes from '../enums/category-types';
  import { getNameByValue } from '../utils/enums';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryType } from '../utils/categories';

  const labels = shortMonths;

  export let year;
  export let transactions;

  const getInitialData = () => {
    const initialData = {
      [CategoryTypes.Spending]: {
        color: 'orangered',
        label: getNameByValue(CategoryTypes, CategoryTypes.Spending),
        values: {}
      },
      [CategoryTypes.Income]: {
        color: 'seagreen',
        label: getNameByValue(CategoryTypes, CategoryTypes.Income),
        values: {}
      },
      [CategoryTypes.Savings]: {
        color: 'royalblue',
        label: getNameByValue(CategoryTypes, CategoryTypes.Savings),
        values: {}
      }
    };

    for (let i = 1; i <= 12; ++i) {
      initialData[CategoryTypes.Spending].values[i] = 0;
      initialData[CategoryTypes.Income].values[i] = 0;
      initialData[CategoryTypes.Savings].values[i] = 0;
    }

    return initialData;
  };

  $: summary = transactions
    .map(t => ({
      month: t.period % 100,
      value: getFormattedAmount(t),
      categoryType: getCategoryType(t.category)
    }))
    .filter(t => t.categoryType !== CategoryTypes.Ignored)
    .reduce((acc, t) => {
      acc[t.categoryType].values[t.month] += t.value;
      return acc;
    }, getInitialData());
  $: data = Object.values(summary);
</script>

<div class="w-full mt-8 pt-8 border-t">
  <LineChart title="Summary per Month" {labels} {data} />
</div>
