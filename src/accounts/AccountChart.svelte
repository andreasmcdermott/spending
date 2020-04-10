<script>
  import ExpensesInPeriodChart from './ExpensesInPeriodChart.svelte';
  import ExpensesInCategoriesChart from './ExpensesInCategoriesChart.svelte';
  import AccountSummaryChart from './AccountSummaryChart.svelte';
  import Tabs from '../elements/Tabs.svelte';
  import { createSlugFromName } from '../utils/fns';
  import { createCachedStore } from '../utils/cachedStore';

  export let id;

  const selectedId = createCachedStore(`summary-tab-${id}`, '');

  const items = [
    { label: 'Summary', component: AccountSummaryChart },
    { label: 'Expenses per month', component: ExpensesInPeriodChart },
    { label: 'Expenses per categories', component: ExpensesInCategoriesChart }
  ].map(item => ({ ...item, id: createSlugFromName(item.label) }));
</script>

<Tabs
  {items}
  props={{ id }}
  selectedId={$selectedId}
  on:select={e => {
    $selectedId = e.detail;
  }} />
