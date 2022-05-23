<script>
  import copy from "$data/copy.json";
  import Header from "$components/k_means/Header.svelte";
  import ScrollyStepWrapper from "$components/layouts/Scrolly.StepWrapper.svelte";
  import ScrollyStep from "$components/layouts/Scrolly.Step.svelte";
  import ScrollyStepContent from "$components/layouts/Scrolly.StepContent.svelte";
  import KMeans from "$components/k_means/KMeans.svelte";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import scrollama from "scrollama";

  // Scroller parameters
  const scrollyIndex = writable(undefined);
  setContext("Scrolly", { scrollyIndex });

  // Init scrollama
  onMount(async () => {
    const scroller = scrollama();
    scroller
      .setup({
        step: ".foreground-wrapper > *",
        offset: 0.5
        // parent
      })
      .onStepEnter((response) => {
        $scrollyIndex = response.index;
      });
  });
</script>

<!-- TODO: Clicking each section title shows the ToC -->

<div
  class="wrapper"
  style:pointer-events={$scrollyIndex === 0 ? "none" : "auto"}
>
  <div class="foreground-wrapper">
    <ScrollyStepWrapper height={"100vh"}>
      <Header />
    </ScrollyStepWrapper>

    {#each copy.steps as step, i}
      <ScrollyStepWrapper height={"auto"}>
        <ScrollyStep active={$scrollyIndex === i + 1}>
          <ScrollyStepContent data={step.value} />
        </ScrollyStep>
      </ScrollyStepWrapper>
    {/each}

    <div class="spacer" />
  </div>

  <div class="background-wrapper">
    <KMeans />
  </div>
</div>

<style>
  .spacer {
    height: 30vh;
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
    /* Center vertically */
    top: 47%;
    transform: translate(0, -50%);
    flex: 1 1 50%;
    width: 50%;
    height: 100%;
  }

  .foreground-wrapper {
    height: 100%;
    flex: 1 1 40%;
    z-index: 10;
  }

  /* TODO: Mobile view */
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
