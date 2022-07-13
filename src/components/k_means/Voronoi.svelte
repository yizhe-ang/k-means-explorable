<script>
  import { getContext } from "svelte";
  import { select, drag, Delaunay } from "d3";
  import { clamp, closest } from "$utils/helpers.js";
  import {
    clusterColors,
    totalIterations,
    algoStep,
    stepView,
    toggleKMeans
  } from "$stores/misc";
  import { fade, scale, draw } from "svelte/transition";
  import { cubicOut, cubicIn, backOut } from "svelte/easing";
  import { spring } from "svelte/motion";
  import uid from "$utils/uid";
  import DemoLine from "$components/k_means/Demo.Line.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const {
    data,
    centroids,
    centroidsHistory,
    assignmentsHistory,
    numIterations
  } = getContext("KMeans");
  const { width, height, xScale, yScale, xGet, yGet } = getContext("LayerCake");

  let hideFill = false;
  let showFill = false;

  const fillOpacity = 0.2;

  // const key = (i) => `${i}-${$centroids.length}-${$selectedDataset.name}`;
  const key = (i) => `${i}-${$centroids.length}}`;

  // const key = (d) => `${$centroids.length}-${d.clusterId}`;
  const linesKey = (i) => {
    if ($scrollyIndex >= 14) {
      return `${i}-${assignments[i]}`;
    } else {
      return i;
    }
  };
  $: $totalIterations = $centroidsHistory.length;

  // Or define a new spring whenever number of cluster changes
  // NOTE: Has to be sorted because the spring value is fixed
  let centroidsSpringed = spring(undefined);

  $: runScrollyEvents($scrollyIndex);
  function runScrollyEvents(index) {
    if (index === 10) {
      $toggleKMeans = !$toggleKMeans;
    } else if (index <= 11) {
      $stepView = false;
    } else if (index === 12) {
      $toggleKMeans = !$toggleKMeans;
      $stepView = true;
      $algoStep = firstStep;
      updateStep(firstStep);
    } else if (index === 13) {
      $stepView = true;
      $algoStep = firstStep;
      updateStep(firstStep);
    } else if (index === 14) {
      $algoStep = 0;
    } else if (index === 15) {
      $algoStep = 1;
    } else if (index === 16) {
      // Perform the rest of the iterations
      interval = setInterval(() => {
        $algoStep++;
      }, 700);
    } else if (index === 17) {
      $stepView = true;
      $algoStep = firstStep;
    } else if (index === 18) {
      $stepView = false;
      $toggleKMeans = !$toggleKMeans;
    } else if (index === 20) {
      $stepView = false;
    }
  }

  $: if ($stepView) {
    updateStep($algoStep);
  } else {
    // Show the final results
    assignments = $assignmentsHistory[$assignmentsHistory.length - 1];
    updateSpring($centroids);
    $numIterations = $totalIterations - 1;
  }

  function updateSpring(centroids) {
    if ($centroidsSpringed && centroids.length !== $centroidsSpringed.length) {
      centroidsSpringed = spring(centroids);
    } else {
      $centroidsSpringed = centroids;
    }
  }

  // Compute data
  $: centroidData = computeData($centroidsSpringed, $width, $height);
  function computeData(centroidsSpringed, width, height) {
    // Compute voronoi here
    const voronoi = Delaunay.from(
      centroidsSpringed.map((d) => [$xGet(d), $yGet(d)])
    ).voronoi([0, 0, width, height]);

    return centroidsSpringed.map((c, i) => ({
      ...c,
      // x: $xGet(c.x),
      // y: $yGet(c.y),
      d: voronoi.renderCell(i),
      id: uid("cell")
    }));
  }

  // Manual updating of centroids and cluster assignments as scrollyStep changes
  let assignments;
  let interval;

  // Update according to algo step
  const firstStep = -1;
  $: lastStep = $totalIterations * 2 - 2;

  function updateStep(step) {
    if (step === firstStep) {
      assignments = $assignmentsHistory[0];
      updateSpring($centroidsHistory[0]);
      $numIterations = 0;
    } else if (step >= 0) {
      const assignmentsStep = Math.floor(step / 2);
      const centroidsStep = Math.ceil(step / 2);

      assignments = $assignmentsHistory[assignmentsStep];
      updateSpring($centroidsHistory[centroidsStep]);
      $numIterations = Math.min(Math.floor(step / 2) + 1, $totalIterations - 1);
    }
  }

  // Stop interval
  $: if ($algoStep === lastStep) {
    clearInterval(interval);
  }
  $: if ($scrollyIndex !== 16) {
    clearInterval(interval);
  }

  // Dynamic assignments (changes as centroids are dragged)
  $: if ($scrollyIndex === 11) {
    assignments = $data.map((d) => closest(d, $centroids));
  }

  // To apply drag behavior as an action
  function draggable(node, i) {
    const dragBehavior = drag().on("drag", (e) => {
      // Modify data point, while clamping to valid bounds
      $centroids[i].x = $xScale.invert(clamp(e.x, 0, $width));
      $centroids[i].y = $yScale.invert(clamp(e.y, 0, $height));
    });

    select(node).call(dragBehavior);
  }
</script>

<!-- Clip paths -->
<defs>
  {#each centroidData as d, i (key(i))}
    <clipPath id={d.id.id}>
      <path d={d.d} />
    </clipPath>
  {/each}
</defs>

<!-- Clipped centroids -->
<!-- Using the voronoi cells as the clip path -->
{#if $scrollyIndex >= 3 && $scrollyIndex <= 3}
  {#each centroidData as d, i (key(i))}
    <g clip-path={d.id}>
      <circle
        in:scale={{
          duration: 500,
          easing: cubicOut,
          delay: 0,
          opacity: 1
        }}
        out:scale={{
          duration: 350,
          easing: cubicIn
        }}
        class="centroid-overlay"
        fill-opacity={fillOpacity}
        fill={clusterColors[i]}
        r={120}
        style:transform={`translate(${$xGet(d)}px, ${$yGet(d)}px)`}
      />
    </g>
  {/each}
{/if}

{#if $scrollyIndex === 5 || ($scrollyIndex >= 14 && ($algoStep === lastStep || !$stepView))}
  {#each centroidData as d, i (key(i))}
    <g clip-path={d.id}>
      <circle
        in:scale={{
          duration: 1500,
          easing: cubicOut,
          delay: 1000,
          opacity: 1
        }}
        on:introend={() => {
          hideFill = true;
          showFill = true;
        }}
        on:outroend={() => {
          hideFill = false;
          showFill = false;
        }}
        out:fade={{
          duration: 300,
          easing: cubicIn
        }}
        class="centroid-overlay"
        fill-opacity={hideFill ? 0 : fillOpacity}
        fill={clusterColors[i]}
        r={$width}
        style:transform={`translate(${$xGet(d)}px, ${$yGet(d)}px)`}
      />
    </g>
  {/each}
{/if}

{#if ($scrollyIndex >= 5 && $scrollyIndex <= 5) || ($scrollyIndex >= 14 && ($algoStep === lastStep || !$stepView))}
  {#each centroidData as d, i (key(i))}
    <path
      in:draw={{ duration: 1500 }}
      out:fade={{ duration: 350 }}
      class="voronoi-cell"
      d={d.d}
      fill={clusterColors[i]}
      fill-opacity={showFill ? fillOpacity : 0}
      stroke={clusterColors[i]}
    />
  {/each}
{/if}

<!-- NOTE: Putting animations for the lines makes it pretty laggy -->
<!-- Lines from data point to centroid -->
{#if ($scrollyIndex >= 11 && $scrollyIndex <= 11) || ($scrollyIndex >= 14 && $algoStep >= 0 && $algoStep < lastStep && $stepView)}
  {#each $data as d, i (linesKey(i))}
    {@const cI = assignments[i]}
    {@const c = $centroidsSpringed[cI]}
    <DemoLine data={[d, c]} stroke={clusterColors[cI]} strokeOpacity={0.9} />
  {/each}
{/if}

<!-- Interactive centroids -->
{#if ($scrollyIndex >= 8 && $scrollyIndex <= 11) || $scrollyIndex >= 13}
  {#each centroidData as d, i (key(i))}
    <!-- FIXME: Is the scale transition not causing the circles not to appear on firefox? -->
    <circle
      in:scale={{
        duration: 300,
        easing: backOut,
        delay: $scrollyIndex === 8 ? 400 : 0,
        opacity: 1
      }}
      out:scale={{
        duration: 350,
        easing: cubicIn
      }}
      use:draggable={i}
      class="centroid"
      fill={clusterColors[i]}
      style:transform={`translate(${$xGet(d)}px, ${$yGet(d)}px)`}
      style:pointer-events={$scrollyIndex === 11 ? "auto" : "none"}
    />
  {/each}
{/if}

<style>
  .centroid-overlay {
    transform-box: fill-box;
    transform-origin: center;
    pointer-events: none;
  }

  .centroid {
    transform-box: fill-box;
    transform-origin: center;

    r: 15;
  }
  .voronoi-cell {
    stroke-width: 2;
    /* fill-opacity: 0.25; */

    pointer-events: none;
    /* transition: fill-opacity 500ms, stroke-opacity 500ms; */
    transition: stroke-opacity 500ms;
  }
</style>
