<script>
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let numIterations;
  export let totalIterations;
</script>

<div
  in:fly={{ x: -50, duration: 500, easing: cubicOut }}
  out:fly={{ x: -50, duration: 500, easing: cubicOut }}
>
  Iteration <span class="value">{numIterations}</span> / {totalIterations}
</div>

<style>
  div {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-gray-400);
  }

  .value {
    color: var(--color-fg);
  }
</style>
