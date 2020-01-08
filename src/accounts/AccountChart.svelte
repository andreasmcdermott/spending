<script>
  import ExpensesInPeriodChart from './ExpensesInPeriodChart.svelte';
  import ExpensesInCategoriesChart from './ExpensesInCategoriesChart.svelte';
  import AccountSummaryChart from './AccountSummaryChart.svelte';
  import Tabs from '../elements/Tabs.svelte';

  export let id;

  const items = [
    { label: 'Summary', component: AccountSummaryChart },
    { label: 'Expenses per month', component: ExpensesInPeriodChart },
    { label: 'Expenses per categories', component: ExpensesInCategoriesChart }
  ];
</script>

<Tabs {items} props={{ id }} />
