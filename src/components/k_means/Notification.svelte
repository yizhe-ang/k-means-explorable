<script>
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";
</script>

<div class="wrapper">
  <MaxWidthWrapper maxWidth={"75ch"}>
    <p>
      <i>Whoops!</i> This article has not yet been designed for smaller
      screens... do view it on
      <b>a desktop with a larger screen size instead</b>!
    </p>
  </MaxWidthWrapper>
</div>

<style>
  .wrapper {
    padding-bottom: 64px;
    padding-top: 64px;
    background-color: hsl(51, 90%, 93%);
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .source-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icons-wrapper {
    display: flex;
    justify-content: center;
    gap: 32px;
  }

  p {
    text-align: center;
  }

  .acknowledgements {
    font-style: italic;
  }
</style>
