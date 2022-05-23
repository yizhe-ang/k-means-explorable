<script>
  import { getContext, onDestroy } from "svelte";
  import { Delaunay } from "d3-delaunay";
  import { clusterColors } from "$stores/misc";
  import { getRandom, getRandomInt } from "$utils/helpers";
  import { fade, blur, fly, slide, scale, draw } from "svelte/transition";
  import { cubicOut, cubicIn } from "svelte/easing";

  const { data, xGet, yGet, xScale, yScale, width, height } = getContext("LayerCake");

  let hoveredIndex = null;
  let neighboringIndices = [];

  $: points = $data.map((d) => {
    const point = [$xGet(d), $yGet(d)];

    return point;
  });

  $: delaunay = Delaunay.from(points);
  $: voronoi = delaunay.voronoi([0, 0, $width, $height]);

  document.addEventListener("mousemove", onMouseMove);
  onDestroy(() => {
    document.removeEventListener("mousemove", onMouseMove);
  });

  $: indicesToRender = [hoveredIndex, ...neighboringIndices];

  function onMouseMove(e) {
    const pos = [e.clientX, e.clientY];
    hoveredIndex = delaunay.find(...pos);

    // Get neighbours too
    neighboringIndices = [...delaunay.neighbors(hoveredIndex)];
  }
</script>

<!-- TODO: Add a retro feel / filter to the strokes and fill? -->
<!-- TODO: Make the strokes more meaty / curvy -->
<!-- TODO: Also show the data points, but more subdued? -->

<!-- Gradients -->
<!-- TODO: at random angles? -->
<defs>
  {#each indicesToRender as index, i (index)}
    <linearGradient id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:{getRandom(clusterColors)};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{getRandom(clusterColors)};stop-opacity:1" />
    </linearGradient>
  {/each}
</defs>

<!-- Voronoi -->
{#each indicesToRender as index, i (index)}
  <path
    in:scale={{ opacity: 0, duration: 300, easing: cubicOut, delay: i * 30 }}
    out:fade={{ duration: 200, easing: cubicOut, delay: i * 50 }}
    class="voronoi-cell"
    d={voronoi.renderCell(index)}
    fill={`url(#grad${index})`}
    fill-opacity={0.4}
    stroke={"var(--color-gray-300)"}
  />
{/each}
<!-- {#each indicesToRender as index, i (index)}
  <path
    in:scale={{ opacity: 0, duration: 300, easing: cubicOut, delay: i * 30 }}
    out:fade={{ duration: 500, easing: cubicOut, delay: i * 50 }}
    class="voronoi-cell"
    d={voronoi.renderCell(index)}
    fill={getRandom(clusterColors)}
    fill-opacity={0.4}
    stroke={"var(--color-gray-300)"}
  />
{/each} -->

<!-- {#each points as point, i}
  <path
    class="voronoi-cell"
    d={voronoi.renderCell(i)}
    fill={getRandom(clusterColors)}
    fill-opacity={indicesToRender.includes(i) ? 0.4 : 0}
    stroke={indicesToRender.includes(i) ? "var(--color-gray-300)" : "none"}
  />
{/each} -->
<style>
  .voronoi-cell {
    pointer-events: all;
    outline: none;
    stroke-width: 3;
    stroke-linejoin: round;
    stroke-linecap: round;

    transform-box: fill-box;
    transform-origin: center;

    /* fill-opacity: 0.5; */

    /* filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4)); */
    /* filter: drop-shadow(0px 0.2px 0.3px hsl(var(--shadow-color) / 0.07)); */

    /* transition: all 200ms; */
  }

</style>
