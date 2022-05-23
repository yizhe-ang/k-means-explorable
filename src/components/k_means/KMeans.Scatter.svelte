<script>
  // TODO: Generalize
  // FIXME: Should I switch to canvas?
  import { getContext } from "svelte";
  import CircleSpringed from "$components/k_means/Circle.Springed.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const { data } = getContext("KMeans");
</script>

<g>
  {#each $data as d, i (d)}
    <CircleSpringed {d} />
  {/each}
</g>
