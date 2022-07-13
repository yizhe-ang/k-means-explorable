<script>
  import MaxWidthWrapper from "$components/layouts/MaxWidthWrapper.svelte";
  import SectionTitle from "$components/k_means/SectionTitle.svelte";
  import Link from "$components/k_means/Link.svelte";
</script>

<div class="wrapper">
  <MaxWidthWrapper maxWidth={"70ch"}>
    <SectionTitle tag={"h2"} index={"4."} title={"References"} />
    <p>
      The following are resources I'd consulted heavily while creating this
      article, and are great starting points for further reading:
    </p>
    <ul>
      <li>
        The <Link
          href="https://developers.google.com/machine-learning/clustering"
          >Clustering in Machine Learning</Link
        > course from the Google Developers site.
      </li>
      <li>
        Scikit-learn's documentation for <Link
          href="https://scikit-learn.org/stable/modules/clustering.html#k-means"
          >K-means clustering</Link
        >.
      </li>
      <li>
        Chapter 21.3 of the <Link
          href="https://probml.github.io/pml-book/book1.html"
          >Probabilistic Machine Learning: An Introduction</Link
        > textbook by Kevin Patrick Murphy.
      </li>
    </ul>
  </MaxWidthWrapper>
</div>

<style>
  .wrapper {
    margin-top: -15vh;
    padding-bottom: 64px;
  }

  ul {
    margin-left: 32px;

    list-style: none;
  }

  li {
    font-size: 1.1rem;
    line-height: 1.9;
    margin-bottom: 8px;
  }

  ul li::before {
    content: "\2022"; /* Add content: \2022 is the CSS Code/unicode for a bullet */
    color: var(--color-gray-300); /* Change the color */
    font-weight: bold; /* If you want it to be bold */
    display: inline-block; /* Needed to add space between the bullet and the text */
    width: 1em; /* Also needed for space (tweak if needed) */
    margin-left: -1em; /* Also needed for space (tweak if needed) */
  }
</style>
