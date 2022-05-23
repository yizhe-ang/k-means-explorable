<script>
  import DatasetRadioGroup from "$components/k_means/DatasetRadioGroup.svelte";
  import KMeansStepper from "$components/k_means/KMeans.Stepper.svelte";
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@rgossiaux/svelte-headlessui";
  import { stepView, algoStep } from "$stores/misc";

  $: selectedTabIndex = $stepView ? 1 : 0;

  const tabs = ["Datasets", "Algorithm"];
  const panels = [DatasetRadioGroup, KMeansStepper];
</script>

<div class="wrapper">
  <TabGroup
    key={selectedTabIndex}
    defaultIndex={selectedTabIndex}
    on:change={(e) => {
      console.log(e.detail);

      selectedTabIndex = e.detail

      if (e.detail === 0) {
        $stepView = false;
      } else if (e.detail === 1) {
        $stepView = true;
        $algoStep = -1;
      }
    }}
  >
    <TabList class={"tab-list"}>
      {#each tabs as t}
        <Tab class={({ selected }) => (selected ? "tab-selected" : "tab-unselected")} let:selected>
          {t}
        </Tab>
      {/each}
    </TabList>
    <TabPanels>
      {#each panels as p}
        <TabPanel class={"tab-panel"}><svelte:component this={p} /></TabPanel>
      {/each}
    </TabPanels>
  </TabGroup>
</div>

<style>
  .wrapper {
    margin-left: -16px;
    background-color: var(--color-gray-50);
  }

  /* * > :global(.tab-unselected) {
    background: hot-pink;
  } */
  :global(.tab-list) {
    --tab-background-color: var(--bg-color);
    --tab-padding: 12px 32px;

    display: flex;
    /* justify-content: flex-start; */
    justify-content: space-evenly;
    /* gap: 64px; */
    /* padding: 0.25rem; */

    background-color: var(--tab-background-color);
    border-top: 1px solid var(--color-gray-300);
    border-bottom: 1px solid var(--color-gray-300);
    border-right: 1px solid var(--color-gray-200);
    border-radius: 5px;

    box-shadow: var(--shadow-elevation-medium);

    color: rgb(255 255 255);
  }

  :global(.tab-selected) {
    --border-size: 3px;

    /* width: 100%; */
    margin: 0;
    margin-bottom: calc(-1 * var(--border-size) / 2);
    padding: var(--tab-padding);
    box-sizing: border-box;

    font-weight: 600;

    background-color: var(--tab-background-color);
    color: var(--color-fg);

    border-radius: 1%;
    /* border-bottom: var(--border-size) solid var(--color-gray-800); */
    border-bottom: var(--border-size) solid hsl(var(--hsl-gray-800), 1);

    transition: all 200ms;
  }

  :global(.tab-selected):focus {
    box-shadow: none;
  }

  :global(.tab-selected):hover {
    background-color: var(--tab-background-color);
  }

  :global(.tab-unselected) {
    --border-size: 3px;

    /* width: 100%; */
    margin: 0;
    margin-bottom: calc(-1 * var(--border-size) / 2);
    padding: var(--tab-padding);

    font-weight: 600;

    background-color: var(--tab-background-color);
    color: var(--color-gray-400);

    border-radius: 1%;
    /* border-bottom: var(--border-size) solid var(--color-gray-800); */
    border-bottom: var(--border-size) solid hsl(var(--hsl-gray-800), 0);
    box-shadow: none;

    transition: all 200ms;
  }

  :global(.tab-unselected):hover {
    background-color: var(--tab-background-color);
    color: var(--color-fg);
  }

  :global(.tab-panel) {
    margin-top: -2px;
    padding: 18px;
    padding-top: 24px;

    /* box-shadow: var(--shadow-elevation-low); */
    /* box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px; */
    border-right: 1px solid var(--color-gray-200);
    border-bottom: 1px solid var(--color-gray-200);
    /* border-bottom: 1px solid var(--color-gray-300); */
    /* TODO: Only at certain corners */
    border-radius: 5px;

    /* background-color: lightgrey; */

  }
</style>
