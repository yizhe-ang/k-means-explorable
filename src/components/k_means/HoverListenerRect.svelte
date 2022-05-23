<script>
  import { getContext } from "svelte";
  import { closest } from "$utils/helpers";

  const { width, height, padding, xScale, yScale } = getContext("LayerCake");
  const { data } = getContext("KMeans");

  export let pointerEvents = "auto";
  export let hoveredPoint;
</script>

<!-- Listening rect -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<rect
  on:mousemove={(e) => {
    const x = $xScale.invert(e.offsetX - $padding.left);
    const y = $yScale.invert(e.offsetY - $padding.top);

    // Find closest
    // hoveredPoint = $data[closest({ x, y }, $data)];
    const point = { i: closest({ x, y }, $data) };
    point.d = $data[point.i];

    hoveredPoint = point;
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
