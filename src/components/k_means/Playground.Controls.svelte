<script>
  import PlaygroundTabs from "$components/k_means/Playground.Tabs.svelte";
  import IconButton from "$components/k_means/IconButton.svelte";
  import InputNumber from "$components/k_means/InputNumber.svelte";
  import { algoStep, toggleKMeans, numClusters } from "$stores/misc";
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const { scrollyIndex } = getContext("Scrolly");

  const firstStep = -1;
</script>

<div class="wrapper">
  <!-- Rerun clustering -->
  <div class="ui-wrapper">
    <IconButton
      name={"refresh-cw"}
      onClick={() => {
        $toggleKMeans = !$toggleKMeans;
        // HACK: To trigger reactivity
        $algoStep = -2;
        $algoStep = firstStep;
      }}
    />

    <!-- Number of clusters -->
    {#if $scrollyIndex >= 21}
      <div
        in:fly={{ x: -50, duration: 500, easing: cubicOut }}
        out:fly={{ x: -50, duration: 500, easing: cubicOut }}
      >
        <InputNumber bind:value={$numClusters} name={"num-clusters"} label={"k:"} min={1} max={5} />
      </div>
    {/if}
  </div>

  <PlaygroundTabs />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 28px;
    margin-bottom: 28px;
  }

  .ui-wrapper {
    display: flex;
    gap: 24px;
    align-items: center;
  }
</style>
