<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  const { xGet, yGet } = getContext("LayerCake");

  export let data;
  export let r = 10;
  export let fill = "black";
  export let fillAccessor = undefined;
  export let stroke = "#000";
  export let strokeWidth = 0;
  export let strokeOpacity = 1.0;
</script>

<g>
  {#each data as d}
    {@const cx = $xGet(d)}
    {@const cy = $yGet(d)}
    <!-- <circle
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200, delay: 400 }}
      style:transform={`translate(${cx}px, ${cy}px)`}
      {r}
      fill={fillAccessor ? fillAccessor(d) : fill}
      {stroke}
      stroke-width={strokeWidth}
      stroke-opacity={strokeOpacity}
    /> -->
    <circle
      in:fade={{ duration: 200 }}
      style:transform={`translate(${cx}px, ${cy}px)`}
      {r}
      fill={fillAccessor ? fillAccessor(d) : fill}
      {stroke}
      stroke-width={strokeWidth}
      stroke-opacity={strokeOpacity}
    />
  {/each}
</g>

<style>
  circle {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: none;
  }
</style>
