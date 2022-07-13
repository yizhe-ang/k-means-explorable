<script>
  import Link from "$components/k_means/Link.svelte";
</script>

<div class="wrapper">
  <h1>K-Means<br />Clustering</h1>
  <h4>An Explorable Explainer</h4>
  <p>By <Link href="https://yizhe-ang.github.io/">Yi Zhe Ang</Link></p>
</div>

<Link />

<style>
  h1 {
    pointer-events: auto;
  }

  h4 {
    text-align: left;
    margin-top: 10px;

    text-shadow: var(--text-shadow);

    pointer-events: auto;
  }

  @media (max-width: 50rem) {
    h1 {
      font-size: 3.5rem;
    }

    h4 {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.3rem;
    font-weight: 250;
    text-align: left;

    /* text-shadow: var(--text-shadow); */

    pointer-events: auto;
  }

  p a {
    color: var(--color-fg);
  }
</style>
