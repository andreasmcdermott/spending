<script>
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import LineChart from '../elements/LineChart.svelte';
  import { getTransactionsForAccount } from '../transactions/store';
  import { getFormattedAmount } from '../utils/transactions';
  import { getCategoryType } from '../utils/categories';
  import CategoryTypes from '../enums/category-types';
  import YearPicker from './AccountYearPicker.svelte';
  import { getNameByValue } from '../utils/enums';
  import { shortMonths } from '../utils/date';

  export let id;

  let year = '';
  const labels = shortMonths;

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

  $: data = getTransactionsForAccount(id, 'summary');
  $: {
    const yearValue = parseInt(year, 10) * 100;
    data.applyFilter({ period: { $between: [yearValue + 1, yearValue + 12] } });
  }
  $: summary = Object.values(
    $data
      .map(d => ({
        year: Math.floor(d.period / 100),
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
