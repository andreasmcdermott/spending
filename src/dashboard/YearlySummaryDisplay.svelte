<script>
  import CategoryTypes from '../enums/category-types';
  import SummaryRowDisplay from './SummaryRowDisplay.svelte';
  export let year;
  export let data;

  const numMonth = Object.keys(data.periods).length;

  const averagePerMonth = amount => amount / numMonth;
</script>

<div class="mt-8">
  <h1 class="text-2xl mb-3 border-blue-500 border-b-4 pl-2">{year}</h1>
  <div class="flex p-2">
    <div class="w-1/2">
      <h2 class="font-bold mb-2">Total</h2>
      <SummaryRowDisplay title="Income" data={data[CategoryTypes.Income]} includeSubs={true} />
      <SummaryRowDisplay title="Spending" data={data[CategoryTypes.Spending]} />
      <SummaryRowDisplay title="Savings" data={data[CategoryTypes.Savings]} />
    </div>
    <div class="w-1/2">
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
