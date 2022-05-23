<script>
  import scrollY from "$stores/scrollY.js";
  import { LayerCake, Svg } from "layercake";
  import HeroVoronoi from "$components/k_means/Hero.Voronoi.svelte";

  const numPoints = 50;
  const points = Array.from({ length: numPoints }, () => [Math.random(), Math.random()]);
</script>

<div class="wrapper">
  <LayerCake data={points} x={0} y={1}>
    <Svg>
      <HeroVoronoi />
    </Svg>
  </LayerCake>
</div>

<style>
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
