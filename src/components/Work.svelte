<script context="module">
  // import { RichText, Link } from "prismic-dom";
  import * as Prismic from "@prismicio/helpers";
  import _isMobile from "is-mobile";

  import Spacer from "../components/Spacer.svelte";
  import DraggableVideo from "../components/DraggableVideo.svelte";
  import Tinder from "../components/Tinder.svelte";
</script>

<script>
  export let uid;
  export let data;

  let mobile = isMobile();

  const release = new Date(data.release);
  const year = release.getFullYear().toString().substr(2);
  const month = release.getMonth() + 1;

  function handleResize() {
    mobile = isMobile();
  }

  function isMobile() {
    return _isMobile({ featureDetect: true, tablet: false });
  }
</script>

<svelte:window on:resize={handleResize} />

<article class="c-work" data-scroll-section>
  <div data-scroll data-scroll-position="bottom" data-scroll-offset="150">
    <div class="l-grid">
      <div class="l-container">
        <header class="c-work__header">
          <h2 class="c-work__title">{Prismic.asText(data.title)}</h2>
          <Spacer size={1} only="mobile" />
          <h4 class="c-work__release">
            <div class="c-work__month">{month}</div>
            <div class="c-work__year">{year}</div>
          </h4>
        </header>
      </div>
    </div>

    <Spacer size={4} only="mobile" />
    <Spacer size={8} only="desktop" />

    {#if mobile}
      <Tinder {...data} {uid} />
    {:else}
      <DraggableVideo {...data} {uid} />
    {/if}

    <Spacer size={4} only="mobile" />
    <Spacer size={8} only="desktop" />

    <div class="l-grid">
      <div class="l-container">
        <div data-scroll class="c-work__details l-grid">
          <span class="c-work__detail">{Prismic.asText(data.type)}</span>
          <span class="c-work__detail">
            {@html Prismic.asText(data.role)}
          </span>
          <span class="c-work__detail">
            <!-- <a rel="noopener" target="_blank" href={Prismic.url(data.link)}>
              Visit Site
            </a> -->
          </span>
        </div>
      </div>
    </div>

    <Spacer size={20} only="mobile" />
    <Spacer size={30} only="desktop" />
  </div>
</article>

<style>
  .c-work {
    position: relative;
  }

  .c-work__header {
    display: grid;
    justify-items: center;
    text-align: center;
  }

  .c-work__release,
  .c-work__title {
    display: inline-block;
    line-height: 1;
  }

  .c-work__month {
    display: none;
  }

  :global(.c-work__detail p) {
    margin: 0;
  }

  .c-work__title,
  .c-work__release,
  .c-work__detail {
    opacity: 0;
    transform-style: preserve-3d;
    transition: all 1s var(--ease-in-out);
    transition-property: opacity, transform;
  }

  .c-work__release {
    transform-origin: top right;
    transform: translateY(30px) scaleY(1.2) skewY(-4deg);

    transition-delay: 0.25s;
  }

  .c-work__title {
    word-spacing: 99999px;
    transform-origin: top left;
    transform: translateY(30px) scaleY(1.4) skewY(4deg);
  }

  .c-work__detail {
    line-height: 1.445;

    transform: translateY(15px);
  }

  .c-work__detail:nth-child(1) {
    transition-delay: 0.15s;
  }

  .c-work__detail:nth-child(2) {
    grid-column-start: 4;
    grid-column-end: 10;
    text-align: center;
    transition-delay: 0.25s;
  }

  .c-work__detail:nth-child(3) {
    grid-column-start: 12;
    transition-delay: 0.35s;

    white-space: nowrap;
  }

  :global(.is-inview) .c-work__title,
  :global(.is-inview) .c-work__release,
  :global(.is-inview).c-work__details .c-work__detail {
    transform: none;
    opacity: 1;
  }

  @media screen and (min-width: 40em) {
    .c-work__header {
      grid-template-columns: repeat(10, 1fr);
      align-items: end;

      text-align: left;
    }

    .c-work__title {
      justify-self: start;

      grid-column-start: 1;
      grid-column-end: 4;

      transform: translateY(80px) scaleY(1.8) skewY(8deg);
    }

    .c-work__release {
      justify-self: end;

      grid-column-start: 9;
      grid-column-end: 11;

      transform: translateY(80px) scaleY(1.4) skewY(-8deg);
    }

    .c-work__month {
      display: block;
      text-align: right;
    }

    .c-work__detail:nth-child(2) {
      grid-column-start: 3;
      grid-column-end: 7;
      text-align: left;
    }

    .c-work__detail:nth-child(3) {
      grid-column-start: 10;
    }
  }

  @media screen and (min-width: 62em) {
    .c-work__detail:nth-child(2) {
      grid-column-start: 2;
      grid-column-end: 6;
    }
  }
</style>
