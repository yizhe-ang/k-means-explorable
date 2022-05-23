<script>
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  } from "@rgossiaux/svelte-headlessui";
  import { selectedDataset, datasets, numSamples } from "$stores/misc";
  import InputNumber from "$components/k_means/InputNumber.svelte";
  import blobs from "$svg/blobs.svg";
  import anisoBlobs from "$svg/aniso_blobs.svg";
  import unevenBlobs from "$svg/uneven_blobs.svg";
  import variedBlobs from "$svg/varied_blobs.svg";
  import circles from "$svg/circles.svg";
  import moons from "$svg/moons.svg";
  import noStructure from "$svg/no_structure.svg";

  const svgs = {
    blobs,
    anisoBlobs,
    unevenBlobs,
    variedBlobs,
    circles,
    moons,
    noStructure
  };
</script>

<div class="wrapper">
  <InputNumber
    bind:value={$numSamples}
    name={"num-clusters"}
    label={"Number of Samples:"}
    min={50}
    max={500}
    step={50}
  />

  <RadioGroup
    class={"radio-group"}
    value={$selectedDataset}
    on:change={(e) => {
      $selectedDataset = e.detail;
    }}
  >
    <RadioGroupLabel class={"radio-group-label"}>Choose Dataset</RadioGroupLabel
    >

    {#each $datasets as d (d.name)}
      <RadioGroupOption value={d} let:checked let:active>
        <div class:checked class:active class="option-wrapper">
          {@html svgs[d.name]}
        </div>
      </RadioGroupOption>
    {/each}
  </RadioGroup>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* TODO: Put horizontal scroll shadows */
  :global(.radio-group) {
    display: flex;
    gap: 16px;
    padding-top: 4px;
    padding-bottom: 12px;

    overflow: auto;

    border-radius: 1%;
  }

  :global(.radio-group-label) {
    /* Visually hidden */
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }

  .option-wrapper {
    width: 150px;
    height: 150px;

    background-color: var(--bg-color);
    border: 1px solid var(--color-gray-200);
    border-radius: 1%;
    box-shadow: none;

    cursor: pointer;

    transition: box-shadow 200ms;
  }

  .option-wrapper.checked {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    border: 2px solid var(--color-gray-300);
  }

  .option-wrapper.active {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    border: 2px solid var(--color-gray-300);
  }

  .option-wrapper:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  .checked {
    color: hotpink;
  }
</style>
