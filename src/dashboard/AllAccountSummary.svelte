<script>
  import { getAllTransactions } from '../transactions/store';
  import { categories } from '../categories/store';
  import CategoryTypes from '../enums/category-types';
  import { getFormattedAmount } from '../utils/transactions';
  import { createCachedMap } from '../utils/fns';
  import YearlySummaryDisplay from './YearlySummaryDisplay.svelte';

  const categoryMap = createCachedMap(categories)();
  $: data = getAllTransactions()
    .map(t => ({
      period: t.period,
      year: String(t.period).substr(0, 4),
      categoryType: categoryMap[t.category].type,
      categoryName: categoryMap[t.category].name,
      amount: getFormattedAmount(t)
    }))
    .reduce((acc, { year, period, categoryType, categoryName, amount }) => {
      if (!acc[year])
        acc[year] = {
          periods: {},
          [CategoryTypes.Spending]: { total: 0, subs: {} },
          [CategoryTypes.Income]: { total: 0, subs: {} },
          [CategoryTypes.Savings]: { total: 0, subs: {} },
          [CategoryTypes.Ignored]: { total: 0, subs: {} }
        };

      acc[year].periods[period] = true;

      if (!acc[year][categoryType].subs[categoryName])
        acc[year][categoryType].subs[categoryName] = amount;
      else acc[year][categoryType].subs[categoryName] += amount;
      acc[year][categoryType].total += amount;

      return acc;
    }, {});
  $: years = Object.keys(data).sort();
</script>

{#each years as year}
  <YearlySummaryDisplay {year} data={data[year]} />
{/each}
