<script>
  // From https://twitter.com/geoffrich_/status/1525167882396569601
  // Conditionally wraps its children with any HTML tag
  export let tag = "div";
  export let wrap = false;
</script>

{#if wrap}
  <svelte:element this={tag} {...$$restProps}>
    <slot />
  </svelte:element>
{:else}
  <slot />
{/if}
