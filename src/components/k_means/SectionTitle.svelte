<script>
  export let tag = "h2";
  export let index;
  export let title;
</script>

<!-- TODO: Gradient for h2 -->
<svelte:element this={tag} style:margin-top={tag === "h2" ? "32px" : null}>
  <span class="index">{index}</span>
  {title}
</svelte:element>

<style>
  .index {
    color: var(--color-gray-300);
    margin-right: 4px;
  }
</style>
