<script>
  import kMeans from "ml-kmeans";
  import { range, shuffle, ascending, leastIndex } from "d3";
  import { setContext, getContext } from "svelte";
  import { writable, get } from "svelte/store";
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { copyShallowObjs, closest } from "$utils/helpers";
  import {
    selectedDataset,
    datasets,
    toggleKMeans,
    numSamples,
    totalIterations,
    numClusters
  } from "$stores/misc";
  import KMeansChart from "$components/k_means/KMeans.Chart.svelte";
  import IterationCounter from "$components/k_means/IterationCounter.svelte";

  const { scrollyIndex } = getContext("Scrolly");

  // Data accessors
  const x = (d) => d.x;
  const y = (d) => d.y;

  // Init chart data
  const data = writable(
    range($numSamples).map(() => ({
      x: 0,
      y: 0
    }))
  );
  // const data = writable(blobs.slice(0, numSamples));
  const centroids = writable(undefined);
  const centroidsHistory = writable(undefined);
  const assignmentsHistory = writable(undefined);
  const numIterations = writable(0);

  // Store all chart data inside a context
  setContext("KMeans", { data, centroids, centroidsHistory, assignmentsHistory, numIterations });

  // Compute data
  // FIXME: Blobs should be more separated
  const blobs = copyShallowObjs($datasets[0].data.slice(0, $numSamples));

  $: $data = updateData($selectedDataset, $numSamples);
  function updateData(selectedDataset, numSamples) {
    // Sample and make a copy
    return copyShallowObjs(selectedDataset.data.slice(0, numSamples));
  }

  // Run k-means
  // $: hardcodedCentroids =
  //   $scrollyIndex <= 18
  //     ? [
  //         [0.17512741116924335, 0.09511374650596571],
  //         [0.15580427014309572, 0.4734998043141523],
  //         [0.7686469080284002, 0.85886101712695]
  //       ]
  //     : undefined;

  $: hardcodedCentroids =
    $scrollyIndex <= 18
      ? [
          [0.16179830112769544, 0.19164149860204893],
          [0.3135735376934745, 0.34324934794666984],
          [0.8081586711872253, 0.6392492480733354]
        ]
      : undefined;

  // 0: {x: 0.17512741116924335, y: 0.09511374650596571}
  // 1: {x: 0.15580427014309572, y: 0.4734998043141523}
  // 2: {x: 0.7686469080284002, y: 0.85886101712695}

  // 0: {x: 0.16179830112769544, y: 0.19164149860204893}
  // 1: {x: 0.3135735376934745, y: 0.34324934794666984}
  // 2: {x: 0.8081586711872253, y: 0.6392492480733354}

  $: kMeansData = runKMeans($data, $numClusters, $toggleKMeans);
  function runKMeans(data, numClusters, toggleKMeans) {
    console.log("run k-means");

    // Randomly init centroids
    // const initCentroids =
    //   hardcodedCentroids ||
    //   range(numClusters).map(() => {
    //     return Array.from({ length: 2 }, Math.random);
    //   });

    //   // FIXME: Should I pick from dataset instead? To be fair to rescaled data
    const initCentroids =
      hardcodedCentroids ||
      shuffle([...data])
        .slice(0, numClusters)
        .map((d) => [d.x, d.y]);

    const kMeansResults = [
      ...kMeans(
        data.map((d) => [x(d), y(d)]),
        numClusters,
        {
          withIterations: true, //
          // distanceFunction: squaredDistance
          // initialization: "kmeans++",
          initialization: initCentroids
        }
      )
    ];

    let centroidsHistory = kMeansResults.map((r) => {
      return r.centroids.map((d) => ({
        x: d.centroid[0],
        y: d.centroid[1]
      }));
    });
    centroidsHistory = [initCentroids.map((d) => ({ x: d[0], y: d[1] })), ...centroidsHistory];

    // Sort the centroids
    // FIXME: Make this more efficient?
    // FIXME: Have up to 9 centroids;
    // each centroid occupies a specific position in the grid
    // How to space n centroids equidistant in a grid?
    // sorted id -> og id
    const sortedIndices = [...centroidsHistory[centroidsHistory.length - 1]]
      .map((d, i) => ({ ...d, i }))
      .sort((a, b) => ascending(a.x, b.x))
      .map((d) => d.i);

    centroidsHistory = centroidsHistory.map((arr) => {
      return sortedIndices.map((i) => arr[i]);
    });

    const centroids = centroidsHistory[centroidsHistory.length - 1];

    // Re-index cluster assignments after sorting
    const assignmentsHistory = centroidsHistory.map((arr) => {
      return data.map((d) => closest(d, arr));
    });

    return { centroids, centroidsHistory, assignmentsHistory };
  }
  $: $centroids = kMeansData.centroids;
  $: $centroidsHistory = kMeansData.centroidsHistory;
  $: $assignmentsHistory = kMeansData.assignmentsHistory;

  // Scrolly events that changes data
  let timeout;
  $: console.log("step", $scrollyIndex);
  $: runScrollyEvents($scrollyIndex);
  function runScrollyEvents(index) {
    if (index === undefined) {
      // All points start from zero
      // $data = range(numSamples).map((_) => [0, 0]);
    } else if (index === 1) {
      // TODO: Show ToC
      clearTimeout(timeout);

      $data.map((d) => {
        d.x = 0;
        d.y = 0;
      });
      $data = $data;
    } else if (index === 2) {
      console.log($data);

      // FIXME: To destroy the timeout when the index changes?
      // Init y positions
      timeout = setTimeout(() => {
        $data.map((d, i) => (d.y = blobs[i].y));
        $data = $data;
      }, 500);

      // Then x positions
      timeout = setTimeout(() => {
        $data.map((d, i) => (d.x = blobs[i].x));
        $data = $data;
      }, 900);

      // FIXME: K-means with this dataset is not very deterministic
    } else if (index === 3) {
      // $data.map((d, i) => {
      //   d.x = blobs[i].x;
      //   d.y = blobs[i].y;
      // });
      // $data = $data;
      // clearTimeout(timeout);
    }
  }

  // function getData() {
  //   // return range(50).map((_) => ({
  //   //   x: Math.random(),
  //   //   y: Math.random()
  //   // }));
  //   return range(50).map((_) => [Math.random(), Math.random()]);
  // }
</script>

<!-- Control panel -->
<div class="wrapper">
  <div class="ui-wrapper">
    <!-- Iteration counter -->
    {#if $scrollyIndex >= 12}
      <IterationCounter numIterations={$numIterations} totalIterations={$totalIterations - 1} />
    {/if}
  </div>

  <KMeansChart {x} {y} />
</div>

<style>
  .wrapper {
    /* width: 65vh; */
    width: 45vw;
    max-width: 700px;
    margin-left: auto;
    margin-right: 32px;
  }

  .ui-wrapper {
    height: 15px;
    display: flex;
    justify-content: flex-end;
    padding-left: 32px;
    padding-right: 32px;
  }
</style>
