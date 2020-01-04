<script>
  import Nav from './elements/Nav.svelte';
  import Router from './router/Router.svelte';
  import Dashboard from './views/Dashboard.svelte';
  import CreateAccount from './views/CreateAccount.svelte';
  import Account from './views/Account.svelte';
  import ImportFormat from './views/ImportFormat.svelte';
  import Import from './views/Import.svelte';
  import Update from './views/Update.svelte';
  import Categories from './views/Categories.svelte';
  import Profile from './views/Profile.svelte';
  import { loadDb } from './db/db';

  const dbPromise = loadDb();
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/categories', view: Categories },
    { path: '/profile', view: Profile },
    { path: '/accounts/create', view: CreateAccount },
    { path: '/accounts/:id', view: Account },
    { path: '/accounts/:id/format', view: ImportFormat },
    { path: '/accounts/:id/import', view: Import },
    { path: '/accounts/:id/update', view: Update }
  ];
</script>

<style lang="postcss">
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';

  :global(html) {
    font-size: 12px;
  }
</style>

{#await dbPromise}
  <!-- Nothing for now -->
{:then}
  <div class="flex min-h-screen max-h-screen">
    <Nav />
    <main class="flex-auto p-4 text-lg overflow-auto">
      <Router {routes} />
    </main>
  </div>
{:catch}
  <!-- Nothing for now -->
{/await}
