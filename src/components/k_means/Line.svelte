<script>
  import { getContext } from "svelte";
  import { line, curveLinear } from "d3";
  import { draw } from "svelte/transition";
  import { cubicIn } from "svelte/easing";

  const { xGet, yGet } = getContext("LayerCake");

  export let data;
  export let stroke = "#ccc";
  export let strokeWidth = 2;

  export let curve = curveLinear;

  $: path = line().x($xGet).y($yGet).curve(curve);
  $: pathD = path(data);
</script>

<path
  in:draw={{ duration: 1000 }}
  out:draw={{ duration: 400, easing: cubicIn }}
  d={pathD}
  {stroke}
  stroke-width={strokeWidth}
/>

<style>
  path {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
