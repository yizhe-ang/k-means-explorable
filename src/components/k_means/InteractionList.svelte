<ul>
  <li><b>Click</b> anywhere on the plot to <i>insert</i> a new data point.</li>
  <li><b>Drag</b> any data point to <i>modify</i> its position.</li>
  <li><b>Click</b> any data point to <i>remove</i> it from the plot.</li>
</ul>

<style>
  ul {
    margin-top: -8px;
    margin-bottom: 16px;
    margin-left: 32px;

    list-style: none;
  }

  li {
    font-size: 1.1rem;
    line-height: 1.9;
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
