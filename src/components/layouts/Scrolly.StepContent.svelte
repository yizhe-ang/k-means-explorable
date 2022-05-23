<script>
  import { startsWithCapital } from "$utils/helpers";
  import KMeansStepper from "$components/k_means/KMeans.Stepper.svelte";
  import DatasetRadioGroup from "$components/k_means/DatasetRadioGroup.svelte";
  import PlaygroundControls from "$lib/components/k_means/Playground.Controls.svelte";
  import SectionTitle from "$lib/components/k_means/SectionTitle.svelte";
  import PointerSvg from "$lib/components/k_means/PointerSvg.svelte";
  import InteractionList from "$lib/components/k_means/InteractionList.svelte";

  export let data;

  const components = {
    KMeansStepper,
    DatasetRadioGroup,
    PlaygroundControls,
    SectionTitle,
    PointerSvg,
    InteractionList
  };
</script>

{#each data as d}
  {@const nestedData = d.value}
  {@const props = d.props || {}}

  {#if startsWithCapital(d.type)}
    <svelte:component this={components[d.type]} {...props} />
  {:else}
    <svelte:element this={d.type}>
      {#each nestedData as nestedD}
        {#if nestedD.type === "text"}
          {@html nestedD.value}
        {:else if startsWithCapital(nestedD.type)}
          <svelte:component this={components[nestedD.type]} />
        {:else}
          <svelte:element this={nestedD.type}>
            {nestedD.value}
          </svelte:element>
        {/if}
      {/each}
    </svelte:element>
  {/if}
{/each}

<style>
</style>
