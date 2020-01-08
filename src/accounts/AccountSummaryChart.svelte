<script>
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import LineChart from '../elements/LineChart.svelte';
  import { getTransactionsForAccount } from '../transactions/store';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryType } from '../utils/categories';
  import CategoryTypes from '../enums/category-types';
  import YearPicker from './YearPicker.svelte';
  import { getNameByValue } from '../utils/enums';

  export let id;

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
  let year = '';

  const getInitialData = () => {
    const initialData = {
      [CategoryTypes.Spending]: {
        color: 'red',
        label: getNameByValue(CategoryTypes, CategoryTypes.Spending),
        values: {}
      },
      [CategoryTypes.Income]: {
        color: 'green',
        label: getNameByValue(CategoryTypes, CategoryTypes.Income),
        values: {}
      },
      [CategoryTypes.Savings]: {
        color: 'blue',
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

  $: data = getTransactionsForAccount(id, 'summary');
  $: summary = Object.values(
    $data
      .map(d => ({
        value: getFormattedAmount(d),
        month: d.period % 100,
        categoryType: getCategoryType(d.category)
      }))
      .filter(d => d.categoryType !== CategoryTypes.Ignored)
      .reduce((acc, d) => {
        acc[d.categoryType].values[d.month] += d.value;
        return acc;
      }, getInitialData())
  );
</script>

<div>
  <YearPicker {id} bind:value={year} />
  {#if year}
    <LineChart title="{year} Summary" {labels} bind:data={summary} />
  {/if}
</div>
