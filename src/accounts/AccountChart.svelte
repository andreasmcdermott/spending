<script>
  import ExpensesInPeriodChart from './ExpensesInPeriodChart.svelte';
  import ExpensesInCategoriesChart from './ExpensesInCategoriesChart.svelte';
  import Tabs from '../elements/Tabs.svelte';

  export let id;
</script>

<Tabs items={[
    { label: 'Expenses per month', component: ExpensesInPeriodChart, props: { id } }, 
    { label: 'Expenses per categories', component: ExpensesInCategoriesChart, props: { id } }
  ]} />
