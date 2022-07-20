<script>
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";
  import Icon from "$components/helpers/Icon.svelte";
  import Link from "$components/k_means/Link.svelte";
  import IconLink from "$components/k_means/IconLink.svelte";

  const iconSize = "1.75rem";
</script>

<div class="wrapper">
  <MaxWidthWrapper maxWidth={"75ch"}>
    <div class="content-wrapper">
      <p class="acknowledgements">
        Special thanks to <Link href="https://jetnew.io/">Jet New</Link> and <Link
          href="https://www.linkedin.com/in/chan-guan-hao/">Guan Hao Chan</Link
        > for their awesome feedback
        on this article.
      </p>
      <div class="source-wrapper">
        <p>The <b>source code</b> for this article can be found here:</p>

        <IconLink href="https://github.com/yizhe-ang/k-means-explorable">
          <Icon slot="icon" name="github" width={iconSize} height={iconSize} />
          <svelte:fragment slot="label">Source code</svelte:fragment>
        </IconLink>
      </div>
      <div class="socials-wrapper">
        <p>
          Do you have any questions or suggestions? I'm happy to connect! Feel
          free to <b>reach out to me</b> on:
        </p>
        <div class="icons-wrapper">
          <IconLink href="https://yizhe-ang.github.io/">
            <Icon slot="icon" name="home" width={iconSize} height={iconSize} />
            <svelte:fragment slot="label">Portfolio site</svelte:fragment>
          </IconLink>
          <IconLink href="https://twitter.com/yizhe_ang">
            <Icon
              slot="icon"
              name="twitter"
              width={iconSize}
              height={iconSize}
            />
            <svelte:fragment slot="label">Twitter</svelte:fragment>
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/yizhe-ang/">
            <Icon
              slot="icon"
              name="linkedin"
              width={iconSize}
              height={iconSize}
            />
            <svelte:fragment slot="label">Linkedin</svelte:fragment>
          </IconLink>
          <IconLink href="https://github.com/yizhe-ang">
            <Icon
              slot="icon"
              name="github"
              width={iconSize}
              height={iconSize}
            />
            <svelte:fragment slot="label">Github</svelte:fragment>
          </IconLink>
        </div>
      </div>
    </div>
    <!-- Acknowledgements -->
  </MaxWidthWrapper>
</div>

<style>
  .wrapper {
    padding-bottom: 96px;
    padding-top: 64px;
    background-color: hsl(262, 48%, 96%);
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
    font-size: 1rem;
  }
</style>
