<script>
  import { getContext } from "svelte";
  import DemoLine from "$components/k_means/Demo.Line.svelte";
  import { clusterColors } from "$stores/misc";

  const { centroids, assignmentsHistory } = getContext("KMeans");

  export let hoveredPoint;

  $: assignments = $assignmentsHistory[$assignmentsHistory.length - 1];

  // $: console.log(hoveredPoint);
</script>

<!-- Lines to centroids -->
{#each $centroids as c, i (`${i}-${hoveredPoint.i}`)}
<!-- {#each $centroids as c, i} -->
  {@const isClosest = assignments[hoveredPoint.i] === i}
  <DemoLine
    data={[hoveredPoint.d, c]}
    stroke={isClosest ? clusterColors[i] : "#ccc"}
    strokeWidth={isClosest ? 7 : 2}
  />
{/each}
