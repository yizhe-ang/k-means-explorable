<script>
  export let title = "K-Means Clustering: An Explorable Explainer";
  export let description = "An Explorable Explainer of K-Means Clustering";
  export let url = "https://k-means-explorable.vercel.app/";
  export let keywords =
    "k-means, clustering, unsupervised, machine learning, explorable, explainer, interactive, ai, visualization, tutorial";
  export let socialImg = "https://k-means-explorable.vercel.app/social.png";
  // export let preloadFont = []
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content="Yi Zhe Ang" />
  <meta name="news_keywords" content={keywords} />

  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Yi Zhe Ang" />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />

  <meta property="og:image" content={socialImg} />
  <!-- <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" /> -->

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="https://yizhe-ang.github.io/" />
  <meta name="twitter:creator" content="@yizhe_ang" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content={socialImg} />

  <meta name="robots" content="max-image-preview:large" />

  <link rel="canonical" href="{url}/" />

  <!-- {#each preloadFont as href}
    <link rel="preload" {href} as="font" type="font/woff2" crossorigin />
  {/each} -->
</svelte:head>
