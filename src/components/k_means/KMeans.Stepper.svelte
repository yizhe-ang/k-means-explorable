<script>
  import { totalIterations, algoStep } from "$stores/misc";
  import IconButton from "$components/k_means/IconButton.svelte";

  const firstStep = -1;
  $: lastStep = $totalIterations * 2 - 2;
</script>

<div class="wrapper">
  <div class="ui-wrapper">
    <!-- Step buttons -->
    <IconButton
      name={"skip-back"}
      onClick={() => {
        $algoStep = firstStep;
      }}
    />
    <IconButton
      name={"play"}
      direction={"s"}
      onClick={() => {
        $algoStep = Math.max($algoStep - 1, firstStep);
      }}
    />
    <IconButton
      name={"play"}
      onClick={() => {
        $algoStep = Math.min($algoStep + 1, lastStep);
      }}
    />
    <IconButton
      name={"skip-forward"}
      onClick={() => {
        $algoStep = lastStep;
      }}
    />
  </div>

  <div class="steps-wrapper">
    <div class:active={$algoStep === firstStep}>Initialize prototypes</div>
    <div class="repeat-label">Repeat until convergence:</div>
    <div
      class="repeat-step"
      class:active={$algoStep % 2 === 0 &&
        ![firstStep, lastStep].includes($algoStep)}
    >
      Assign each data point to its closest prototype
    </div>
    <div
      class="repeat-step"
      class:active={$algoStep % 2 === 1 &&
        ![firstStep, lastStep].includes($algoStep)}
    >
      Update prototypes to be the mean of its assigned data points
    </div>
    <div class:active={$algoStep === lastStep}>
      Obtain final cluster assignments
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ui-wrapper {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .steps-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .steps-wrapper div {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;

    font-weight: 600;

    border-radius: 5px;
    transition: background 200ms;
  }

  .steps-wrapper .repeat-label {
    font-weight: 300;
  }

  .steps-wrapper .repeat-step {
    margin-left: 24px;
  }

  .steps-wrapper .active {
    background: var(--color-gray-200);
  }
</style>
