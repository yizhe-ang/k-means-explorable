<script>
  import Link from "$components/k_means/Link.svelte";

  export let href;
</script>

<Link {href}>
  <slot name="icon" />
  <div class="visually-hidden">
    <slot name="label" />
  </div>
</Link>

<style>
  .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
</style>
