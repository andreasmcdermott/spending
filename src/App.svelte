<script>
  import { loadDb } from "./db/db";

  const dbPromise = loadDb();
</script>

<style lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>

{#await dbPromise}
  <!-- Nothing for now -->
{:then}
  <div class="flex">
    <nav class="flex-none p-4">
      <h1>Accounts</h1>
      <ul>
        <li>
          <em>No accounts</em>
        </li>
      </ul>
    </nav>
    <main class="flex-auto p-4">
      <h1>Dashboard</h1>
    </main>
  </div>
{:catch}
  <!-- Nothing for now -->
{/await}
