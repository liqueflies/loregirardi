<script context="module">
  import { onMount, setContext } from "svelte";
  import isMobile from "is-mobile";

  import { key } from "../context/scroll";
  import { ready } from "../store";
</script>

<script>
  let el;
  let listeners = [];

  onMount(async () => {
    const LocomotiveModule = await import("locomotive-scroll");
    const LocomotiveScroll = LocomotiveModule.default;

    listeners.forEach((entity) => {
      entity.ready = true;
    });

    ready.subscribe((value) => {
      if (value) {
        const scroll = new LocomotiveScroll({
          el,
          elMobile: el,
          smooth: true,
          getSpeed: true,
          getDirection: true,
          useKeyboard: true,
        });

        scroll.on("scroll", (instance) => {
          const scrolling = Math.abs(instance.speed) > 0;
          document.documentElement.classList[scrolling ? "add" : "remove"](
            "has-no-pointer"
          );
          listeners.forEach((entity) => {
            if (entity.mounted && entity.ready && entity.scroll) {
              entity.scroll({
                ...instance,
                visible: entity.visible,
                instance: scroll,
              });
            }
          });
        });

        scroll.on("call", (value, way, obj) => {
          listeners.forEach((entity) => {
            if (entity.mounted && entity.ready && entity.value === value) {
              entity.visible = way === "enter";
              if (typeof entity[way] === "function")
                entity[way]({ value, way, obj });
            }
          });
        });
      }
    });
  });

  setContext(key, {
    add(fn) {
      this.remove(fn);
      listeners.push(fn);
    },
    remove(fn) {
      const idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    },
  });
</script>

<main bind:this={el} class="l-grid">
  <slot></slot>
</main>

<style>
  main {
    position: relative;
    overflow: hidden;
  }
</style>
