<script context="module">
  import Hero from "../components/Hero.svelte";
  import About from "../components/About.svelte";
  import WorkList from "../components/WorkList.svelte";

  // export async function preload({ params, query }) {
  //   const { results } = await this.fetch(`index.json`).then((r) => r.json());
  //   return { posts: results };
  // }
</script>

<script>
  export let data;
</script>

<svelte:head>
  <title>Lorenzo Girardi - Creative Technologist</title>
  <meta
    name="description"
    content="Lorenzo Girardi is Creative Technologist, music & art aficionado."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.loregirardi.it" />
  <meta property="og:title" content="Lorenzo Girardi - Creative Technologist" />
  <meta
    property="og:description"
    content="Lorenzo Girardi is Creative Technologist, music & art aficionado."
  />
  <meta property="og:image" content="https://www.loregirardi.it/social.jpg" />
</svelte:head>

<Hero />
<About />
<WorkList posts={data.posts} />
