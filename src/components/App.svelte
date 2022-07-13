<script>
  import Hero from "$components/k_means/Hero.svelte";
  import KMeansScrolly from "$lib/components/k_means/KMeans.Scrolly.svelte";
  import Conclusion from "$lib/components/k_means/Conclusion.svelte";
  import Footer from "$lib/components/k_means/Footer.svelte";
  import scrollY from "$stores/scrollY.js";
</script>

{#if $scrollY === 0}
  <Hero />
{/if}

<!-- FIXME: Do I need these semantic tags? -->
<section id="scrolly">
  <KMeansScrolly />
</section>

<Conclusion />
<Footer />

<style>
</style>
