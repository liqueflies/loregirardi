<script context="module">
  import Scroller from "../components/Scroller.svelte";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import Canvas from "../components/Canvas.svelte";

  import "../global.css";

  export const prerender = true;
</script>

<Scroller>
  <Canvas>
    <Header />
    <slot></slot>
    <Footer />
  </Canvas>
</Scroller>
