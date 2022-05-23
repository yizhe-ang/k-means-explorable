<script>
  // From: https://observablehq.com/@duynguyen1678/propublicas-covid-arrow-map
  export let x0;
  export let y0;

  export let r = 4; // base radius
  export let l; // length of line
  export let w = 2; // stroke-width of line
  export let b = 12; // base length of tip (make sure that r < b)
  export let h = 12; // height of tip

  let d;
  $: {
    const sin = w / r / 2;
    const x = r * Math.sqrt(1 - sin * sin);
    const hb = b / 2;

    d =
      `M${x0},${y0 + hb}` +
      `a${r},${r} 0 0 1 ${r + x},${-w / 2}` +
      `h${l}` +
      `v${-(hb - w / 2)}` +
      `l${h},${hb}` +
      `l${-h},${hb}` +
      `v${-(hb - w / 2)}` +
      `h${-l}` +
      `A${r},${r} 0 0 1 ${x0},${y0 + hb}`;
  }
</script>

<path {d} />

<style>
  path {
    fill: black;
    /* transform-origin: center;
    transform: rotate(0deg); */
  }
</style>