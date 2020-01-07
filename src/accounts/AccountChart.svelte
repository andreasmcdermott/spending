<script>
  import ExpensesInPeriodChart from './ExpensesInPeriodChart.svelte';
  import ExpensesInCategoriesChart from './ExpensesInCategoriesChart.svelte';
  import AccountSummaryChart from './AccountSummaryChart.svelte';
  import Tabs from '../elements/Tabs.svelte';

  export let id;

  const items = [
    { label: 'Summary', component: AccountSummaryChart, props: { id } },
    { label: 'Expenses per month', component: ExpensesInPeriodChart, props: { id } },
    { label: 'Expenses per categories', component: ExpensesInCategoriesChart, props: { id } }
  ];
</script>

<Tabs {items} />
