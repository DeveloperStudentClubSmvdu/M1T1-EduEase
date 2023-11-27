<script>
  export let icon = "star";
  // export let label = "Label";

  $: expanded = false;
  $: expand(expanded);

  export function expand(expanded) {
    console.log(123);
    if (expanded == "toggle")
        document
        ?.querySelector("floating-action-button")
        ?.classList.toggle("expanded");
    else if (expanded === true)
        document
        ?.querySelector("floating-action-button")
        ?.classList.add("expanded");
    else
        document
        ?.querySelector("floating-action-button")
        ?.classList.remove("expanded");
  }
</script>

<floating-action-button class={1 ? "" : "expanded"}>
  <article>
    <slot {expand} />
  </article>
  <button on:click={() => expand("toggle")}>
    <span class="icon material-symbols-outlined">{icon}</span>
    <!-- <span class="label">{label}</span> -->
  </button>
</floating-action-button>

<style>
  floating-action-button {
    position: relative;
    height: 56px;
    width: 56px;
    border-radius: 16px;
    box-shadow: var(--elevation-level3);

    position: fixed;
    bottom: calc(
      16px + var(--navigation-bar-height, 0px) + var(--toast-height, 0px)
    );
    right: 16px;
    overflow: hidden;

    transition: all 600ms var(--easing-emphasized-decelerate),
      border-radius 200ms var(--easing-emphasized-decelerate) 400ms;
    will-change: right, bottom, height, width, border-radius, box-shadow;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    appearance: none;
    background: var(--color-tertiary-container);
    border: none;
    color: var(--color-on-tertiary-container);
    font: inherit;
    cursor: pointer;

    visibility: visible;
    opacity: 1;
    transition: opacity 200ms var(--easing-standard-accelerate) 0ms,
      visibility 0ms linear 0ms;
  }

  article {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;

    background: var(--color-background);
    opacity: 0;
  }

  floating-action-button.expanded {
    height: calc(100% - var(--navigation-bar-height, 0px));
    width: 100%;
    bottom: calc(var(--navigation-bar-height) + 0px);
    right: 0;

    box-shadow: none;
    border-radius: 0;
  }

  floating-action-button.expanded button {
    opacity: 0;
    visibility: hidden;
    transition-delay: 600ms, 1000ms;
    transition-duration: 200ms, 0ms;
    /* transition: visibility 0ms linear 1000ms,
    opacity 200ms var(--easing-standard-accelerate) 600ms; */
  }

  floating-action-button.expanded article {
    opacity: 1;
  }
</style>
