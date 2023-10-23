<script>
  import { onMount } from "svelte";
  export let choiceList;
  let idealChoice;
  onMount(() => {
    idealChoice = document.querySelector(
      `[name=${choiceList.filter((x) => x.highlight).at(-1).name}]`
    )
  })

  let focused, hovered;
  $: finalChoice = hovered ?? focused ?? idealChoice;
  let indicator;
  
</script>

<div aria-hidden="true" tabindex="-1" class="indicator" bind:this={indicator}
  style:top={`${finalChoice?.offsetTop + finalChoice?.offsetHeight / 2 - indicator?.offsetHeight / 2}px`}
  style:width={`${finalChoice?.offsetWidth}px`}
  style:left={`${finalChoice?.offsetLeft}px`}
/>

<div class="widget" role="menu">
  {#each choiceList as choice (choice.name)}
    <a
      role="button"
      href={choice.href ?? "#"}
      on:click={choice.action ?? null}

      on:mouseenter={(e) => (hovered = e.currentTarget)}
      on:focus={(e) => (focused = e.currentTarget)}

      on:mouseleave={() => (hovered = null)}
      on:blur={() => (focused = null)}

      name={choice.name}
      highlight={finalChoice?.getAttribute('name') === choice.name}

    ><span>{@html choice.text}</span></a
    >
  {/each}
</div>

<style>
  .widget {
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  a {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 44px;
    padding: 0 16px 0 24px;
    box-sizing: content-box;

    color: var(--color-on-bg);
    border-radius: 100vh;

    transition: all 200ms;
    transition-timing-function: var(--easing-emphasize-decelerate);
    overflow: hidden;
    text-decoration: none;
  }

  a:focus-visible,
  a[highlight="true"] {
    height: 44px;
    font-size: var(--type-size-l);
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
    
  a:focus-visible {
    outline: 2px solid var(--color-accent);
  }

  a:after {
    content: 'arrow_forward';
    font-family: 'Material Symbols Outlined';
    font-size: 24px;
    display: inline-block;
    font-feature-settings: 'liga';
    -moz-font-feature-settings: 'liga';
    -moz-osx-font-smoothing: grayscale;
    margin-left: 8px;
    overflow: hidden;
    transition: all 200ms;
    transition-timing-function: var(--easing-emphasize-decelerate);
    width: 0;
    opacity: 0;
  }

  @media(pointer: coarse) {
    a[highlight="true"]::after {
      width: 32px;
      opacity: 1;
    }
  }

  a[highlight="true"]:hover::after, a:focus-visible::after {
    width: 32px;
    opacity: 1;
  }

  .indicator {
    position: fixed;
    border-radius: 100vh;
    height: 44px;
    width: 0;
    backdrop-filter: invert(1) hue-rotate(180deg);
    pointer-events: none;

    transition: all 600ms;
    transition-timing-function: var(--easing-emphasize-decelerate);
  }
</style>
