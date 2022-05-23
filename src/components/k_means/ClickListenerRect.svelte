<script>
  import { getContext } from "svelte";

  const { width, height, padding, xScale, yScale } = getContext("LayerCake");
  const { data } = getContext("KMeans");

  export let pointerEvents = "auto";
</script>

<rect
  on:click={(e) => {
    // Add data point
    const x = $xScale.invert(e.offsetX - $padding.left);
    const y = $yScale.invert(e.offsetY - $padding.top);

    data.update((s) => [...s, { x, y }]);
  }}
  height={$height}
  width={$width}
  style:pointer-events={pointerEvents}
/>

<style>
  rect {
    /* fill: hsl(0, 0%, 95%); */
    fill: transparent;
  }
</style>
