<script>
  import Arrow from "$components/custom_charts/Arrow.svelte";
  import { getContext } from "svelte";

  const { width, height } = getContext("LayerCake");

</script>

<Arrow
  x1={0}
  y1={$height}
  x2={$width}
  y2={$height}
  inDelay={500}
/>
<Arrow
  x1={0}
  y1={$height}
  x2={0}
  y2={0}
/>
