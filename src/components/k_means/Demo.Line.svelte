<script>
  import { getContext } from "svelte";
  import { line, curveLinear } from "d3";
  import { draw, fade } from "svelte/transition";

  const { xGet, yGet } = getContext("LayerCake");

  export let data;
  export let stroke = "#ccc";
  export let strokeWidth = 2;
  export let strokeOpacity = 1.0;

  export let curve = curveLinear;

  $: path = line().x($xGet).y($yGet).curve(curve);
  $: pathD = path(data);
</script>

<path
  in:draw={{ duration: 700 }}
  out:fade={{ duration: 200 }}
  d={pathD}
  {stroke}
  stroke-width={strokeWidth}
  stroke-opacity={strokeOpacity}
/>

<style>
  path {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
