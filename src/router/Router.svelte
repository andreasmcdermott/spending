<script>
  import { derived } from 'svelte/store';
  import store from './store';

  export let routes;

  const getArgs = (regexp, str) => {
    const args = [];
    let match;
    regexp.lastIndex = 0;
    while ((match = regexp.exec(str)) !== null) {
      args.push(match[1]);
    }
    return args;
  };

  const getParams = (keys, values) => {
    const params = {};
    for (let i = 0; i < keys.length; ++i) {
      params[keys[i]] = values[i];
    }
    return params;
  };

  const urlRegexp = routes.reduce((acc, r) => {
    acc[r.path] = new RegExp(
      `^${r.path.replace(/\//g, '\\/').replace(/:[a-z]+/gi, '([a-z0-9\\-]+)')}$`,
      'gi'
    );
    return acc;
  }, {});

  const pathRegexp = /:([a-z]+)/gi;
  const argumentKeys = routes.reduce((acc, r) => {
    acc[r.path] = getArgs(pathRegexp, r.path);
    return acc;
  }, {});

  const match = derived(store, $store => {
    const route = routes.find(r =>
      r.path.includes(':') ? urlRegexp[r.path].test($store) : r.path === $store
    );
    if (!route) return null;
    const argumentValues = getArgs(urlRegexp[route.path], $store);
    const params = getParams(argumentKeys[route.path], argumentValues);
    return { ...route, params: params || {} };
  });
</script>

{#if $match}
  <svelte:component this={$match.view} {...$match.params} />
{:else}
  <strong>404</strong>
{/if}
