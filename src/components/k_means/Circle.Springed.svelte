<script>
  import { drag, select } from "d3";
  import { stepView } from "$stores/misc";
  import { clamp } from "$utils/helpers.js";
  import { spring } from "svelte/motion";
  import { getContext } from "svelte";
  import { slide, scale, fade } from "svelte/transition";
  import { backOut, backIn, cubicIn } from "svelte/easing";

  const { width, height, xGet, yGet, xScale, yScale } = getContext("LayerCake");
  const { data } = getContext("KMeans");

  export let d;
  export let r = 5;
  export let fill = "#ccc";
  export let fillOpacity = 0.3;
  export let stroke = "#000";
  export let strokeWidth = 1;
  export let strokeOpacity = 0.9;
  export let pointerEvents = "auto";

  // Every circle has its own spring store as its state
  // TODO: Adjust the spring parameters
  const position = spring(undefined);
  $: $position = [$xGet(d), $yGet(d)];

  // To apply drag behavior as an action
  function draggable(node, d) {
    const dragBehavior = drag().on("drag", (e) => {
      // Bring dragged element to the front
      select(node).raise();

      // Modify data point, while clamping to valid bounds
      d.x = $xScale.invert(clamp(e.x, 0, $width));
      d.y = $yScale.invert(clamp(e.y, 0, $height));

      // Activate reactivity
      $data = $data;
    });

    select(node).call(dragBehavior);
  }
</script>

<!-- FIXME: Animations make it laggy -->
<circle
  transition:fade={{ duration: 200, easing: cubicIn }}
  on:click={() => {
    // Remove selected data point
    data.update((s) => s.filter((datum) => !Object.is(datum, d)));
  }}
  use:draggable={d}
  style:transform={`translate(${$position[0]}px, ${$position[1]}px)`}
  {r}
  {fill}
  fill-opacity={fillOpacity}
  {stroke}
  stroke-width={strokeWidth}
  stroke-opacity={strokeOpacity}
  style:pointer-events={pointerEvents}
/>

<!-- <circle
  in:scale={{ duration: 500, easing: backOut }}
  out:scale={{ duration: 350, easing: cubicIn }}
  on:click={() => {
    // Remove selected data point
    data.update((s) => s.filter((datum) => !Object.is(datum, d)));
  }}
  use:draggable={d}
  style:transform={`translate(${$position[0]}px, ${$position[1]}px)`}
  {r}
  {fill}
  fill-opacity={fillOpacity}
  {stroke}
  stroke-width={strokeWidth}
  stroke-opacity={strokeOpacity}
  style:pointer-events={pointerEvents}
/> -->
<style>
  circle {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: auto;
    /* cursor: pointer; */

    transition: fill 250ms;

    /* r: 5;
    fill: #ccc;
    fill-opacity: 0.5;
    stroke: #000;
    stroke-width: 1;
    stroke-opacity: 0.3; */
  }
</style>
