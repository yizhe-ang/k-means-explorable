<script>
  import { clusterColors, stepView } from "$stores/misc";
  import { LayerCake, Svg, Html } from "layercake";
  import { fade } from "svelte/transition";
  import { getContext } from "svelte";
  import Line from "$lib/components/k_means/Line.svelte";
  import Scatter from "$lib/components/k_means/Scatter.svelte";
  import CircleSpringed from "$lib/components/k_means/Circle.Springed.svelte";
  import ArrowAxis from "$components/k_means/ArrowAxis.svelte";
  import ClickListenerRect from "$lib/components/k_means/ClickListenerRect.svelte";
  import HoverListenerRect from "$lib/components/k_means/HoverListenerRect.svelte";
  import KMeansVoronoi from "$lib/components/k_means/Voronoi.svelte";
  import Histogram from "$lib/components/k_means/Histogram.svelte";
  import ToCentroidsLines from "$lib/components/k_means/ToCentroidsLines.svelte";
  import InteractionIndicator from "$lib/components/k_means/InteractionIndicator.svelte";

  const { data, assignmentsHistory } = getContext("KMeans");
  const { scrollyIndex } = getContext("Scrolly");

  export let x;
  export let y;

  let hoveredPoint = { i: 6, d: $data[6] };

  $: clusterAssignments = $assignmentsHistory[$assignmentsHistory.length - 1];

  // Hardcode sample data to explain distance metric
  const sampleData = [
    { x: 0.8724253053023101, y: 0.7271407765508389, fill: clusterColors[2] },
    { x: 0.8959476388441352, y: 0.8760700961343391, fill: clusterColors[2] },
    { x: 0.410617271319615, y: 0.5144693060869417, fill: clusterColors[1] }
  ];
  const sampleLines = [
    [sampleData[0], sampleData[1]],
    [sampleData[0], sampleData[2]]
  ];

  // Chart parameters
  const p = 20;
  const padding = {
    top: p,
    left: p,
    bottom: p,
    right: p
  };
  const inset = 0.02;
  const domain = [0 - inset, 1 + inset];
</script>

<figure>
  <LayerCake data={$data} {x} {y} {padding} xDomain={domain} yDomain={domain}>
    <Html>
      <!-- Decorative border -->
      {#if $scrollyIndex >= 5}
        <div in:fade={{ delay: 1500 }} out:fade class="border" />
      {/if}
    </Html>

    <Svg>
      <!-- Marginal distributions -->
      {#if $scrollyIndex >= 22}
        <Histogram
          bind:data={$data}
          type={"x"}
          {inset}
          show={$scrollyIndex >= 22}
          pointerEvents={$stepView ? "none" : "auto"}
        />
        <Histogram
          bind:data={$data}
          type={"y"}
          {inset}
          show={$scrollyIndex >= 22}
          pointerEvents={$stepView ? "none" : "auto"}
        />
      {/if}

      <!-- Decoration -->
      {#if $scrollyIndex >= 2 && $scrollyIndex <= 3}
        <ArrowAxis />
      {/if}

      <!-- For clicking (adding a point) interactions -->
      {#if !$stepView && $scrollyIndex >= 23}
        <ClickListenerRect />
      {/if}

      <!-- Lines to demo dist to centroids -->
      {#if $scrollyIndex === 9}
        <ToCentroidsLines {hoveredPoint} />
      {/if}

      <!-- Voronoi and related shapes -->
      {#if $scrollyIndex >= 2}
        <KMeansVoronoi />
      {/if}

      <!-- Data points -->
      {#if $scrollyIndex >= 2}
        <!-- <KMeansScatter /> -->
        {#each $data as d, i (d)}
          <CircleSpringed
            {d}
            fill={$scrollyIndex === 9
              ? clusterColors[clusterAssignments[i]]
              : "var(--color-gray-400)"}
            stroke="var(--color-gray-400)"
            pointerEvents={$scrollyIndex >= 23 && !$stepView ? "auto" : "none"}
          />
        {/each}
      {/if}

      <!-- For hover (show dist to centroids) interactions -->
      {#if $scrollyIndex === 9}
        <HoverListenerRect bind:hoveredPoint />
      {/if}

      <!-- Distance metric demo -->
      {#if $scrollyIndex === 7}
        {#each sampleLines as d}
          <Line data={d} stroke={"hsl(0, 0%, 0%)"} strokeWidth={3} />
        {/each}

        <Scatter
          data={sampleData}
          fillAccessor={(d) => d.fill}
          r={7}
          stroke={"hsl(0, 0%, 0%)"}
          strokeWidth={1}
          strokeOpacity={0.3}
        />
      {/if}

      <!-- Interaction indicator -->
      <InteractionIndicator />
    </Svg>
  </LayerCake>
</figure>

<style>
  figure {
    width: 100%;
    /* width: 65vh; */
    aspect-ratio: 1 / 1;
    /* margin-left: auto; */
    /* margin-right: 32px; */
    /* margin-right: auto; */

    /* border: 1px solid lightgrey; */
  }
  .border {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* background-color: lightpink; */
    /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2); */
    box-shadow: var(--chart-shadow);
    border: 1px solid hsl(0, 10%, 90%);
    border-radius: 1%;
  }
</style>
