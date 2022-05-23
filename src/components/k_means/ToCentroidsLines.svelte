<script>
  import { getContext } from "svelte";
  import DemoLine from "$components/k_means/Demo.Line.svelte";
  import { clusterColors } from "$stores/misc";

  const { centroids, assignmentsHistory } = getContext("KMeans");

  export let hoveredPoint;

  $: assignments = $assignmentsHistory[$assignmentsHistory.length - 1];
</script>

<!-- Lines to centroids -->
{#each $centroids as c, i (`${i}-${hoveredPoint.i}`)}
  {@const isClosest = assignments[hoveredPoint.i] === i}
  <DemoLine
    data={[hoveredPoint.d, c]}
    stroke={isClosest ? clusterColors[i] : "#ccc"}
    strokeWidth={isClosest ? 7 : 2}
  />
{/each}
