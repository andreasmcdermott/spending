<script>
  import { categories } from '../categories/store';
  import CategoryTypes from '../enums/category-types';
  import { createCachedMap } from '../utils/fns';
  import { getFormattedAmount } from '../utils/transactions';
  import SummaryRowDisplay from './SummaryRowDisplay.svelte';

  const categoryMap = createCachedMap(categories)();

  export let year;
  export let transactions;

  $: data = (transactions || [])
    .map(t => ({
      period: t.period,
      categoryType: categoryMap[t.category].type,
      categoryName: categoryMap[t.category].name,
      amount: getFormattedAmount(t)
    }))
    .reduce(
      (acc, { year, period, categoryType, categoryName, amount }) => {
        acc.periods[period] = true;

        if (!acc[categoryType].subs[categoryName]) acc[categoryType].subs[categoryName] = amount;
        else acc[categoryType].subs[categoryName] += amount;
        acc[categoryType].total += amount;

        return acc;
      },
      {
        periods: {},
        [CategoryTypes.Spending]: { total: 0, subs: {} },
        [CategoryTypes.Income]: { total: 0, subs: {} },
        [CategoryTypes.Savings]: { total: 0, subs: {} },
        [CategoryTypes.Ignored]: { total: 0, subs: {} }
      }
    );

  $: periods = Object.keys(data.periods);
  $: numMonth = periods.length;

  const averagePerMonth = amount => amount / numMonth;
</script>

<div class="mt-8">
  <h1 class="text-2xl mb-3 border-blue-500 border-b-4 pl-2">
    {year}
    {#if numMonth !== 12}
      <span class="text-base">({numMonth} mos)</span>
    {/if}
  </h1>
  <div class="flex justify-between p-2">
    <div class="w-5/12 flex-none">
      <h2 class="font-bold mb-2">Total</h2>
      <SummaryRowDisplay title="Income" data={data[CategoryTypes.Income]} includeSubs={true} />
      <SummaryRowDisplay title="Spending" data={data[CategoryTypes.Spending]} />
      <SummaryRowDisplay title="Savings" data={data[CategoryTypes.Savings]} />
    </div>
    <div class="w-5/12 flex-none">
      <h2 class="font-bold mb-2">Average per month</h2>
      <SummaryRowDisplay
        title="Income"
        data={data[CategoryTypes.Income]}
        includeSubs={true}
        mapper={averagePerMonth} />
      <SummaryRowDisplay
        title="Spending"
        data={data[CategoryTypes.Spending]}
        mapper={averagePerMonth} />
      <SummaryRowDisplay
        title="Savings"
        data={data[CategoryTypes.Savings]}
        mapper={averagePerMonth} />
    </div>
  </div>
</div>
