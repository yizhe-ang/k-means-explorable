<script>
  import copy from "$data/copy.json";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import ScrollyStepWrapper from "$lib/components/layouts/Scrolly.StepWrapper.svelte";
  import ScrollyStep from "$lib/components/layouts/Scrolly.Step.svelte";
  import ScrollyStepContent from "$lib/components/layouts/Scrolly.StepContent.svelte";
  import KMeans from "$components/k_means/KMeans.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  // TODO: Set index ranges for different scrolly sections / events here

  // Scroller parameters
  let value;
  const scrollyIndex = writable(undefined);
  setContext("Scrolly", { scrollyIndex });
  $: $scrollyIndex = value;
</script>

<!-- TODO: Cool ass hero interactive hero image -->
<!-- {#if $scrollyIndex === 0}
  <Hero />
{/if} -->

<div class="wrapper">
  <div class="foreground-wrapper">
    <Scrolly bind:value>
      <ScrollyStepWrapper height={"100vh"}>
        <!-- <Header /> -->
      </ScrollyStepWrapper>

      {#each copy.steps as step, i}
        <ScrollyStepWrapper height={"auto"}>
          <ScrollyStep active={$scrollyIndex === i + 1}>
            <ScrollyStepContent data={step.value} />
          </ScrollyStep>
        </ScrollyStepWrapper>
      {/each}

      <div class="spacer" />
    </Scrolly>
  </div>

  <div class="background-wrapper">
    <KMeans />
  </div>
</div>

<style>
  .spacer {
    height: 40vh;
  }

  .wrapper {
    /* margin-top: 64px; */
    text-align: center;
    transition: background 100ms;
    display: flex;
    flex-direction: row-reverse;
  }

  .background-wrapper {
    position: sticky;
    top: 10%;
    /* transform: translate(0, -50%); */
    flex: 1 1 60%;
    width: 60%;
    height: 100%;
  }

  .foreground-wrapper {
    height: 100%;
    flex: 1 1 40%;
    z-index: 10;
  }

  @media screen and (max-width: 768px) {
    .wrapper {
      flex-direction: column-reverse;
    }

    .background-wrapper {
      width: 95%;
      margin: auto;
    }
  }
</style>
