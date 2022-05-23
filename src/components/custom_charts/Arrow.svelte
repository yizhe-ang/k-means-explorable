<script>
  import { line } from "d3";
  import { draw } from "svelte/transition";

  export let x1;
  export let y1;
  export let x2;
  export let y2;

  export let inDelay = 0;

  $: d = line()([
    [x1, y1],
    [x2, y2]
  ]);
</script>

<defs>
  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" />
  </marker>
</defs>
<path in:draw={{ delay: inDelay }} out:draw {d} />

<style>
  path {
    /* marker-end: url(#arrowhead); */

    fill: black;
    stroke: black;
    stroke-width: 2;
  }
</style>
