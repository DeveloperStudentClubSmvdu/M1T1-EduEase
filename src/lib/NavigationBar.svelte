<script>
  export let destinations = [
    {
      icon: "star",
      label: "Label 1",
      id: "label1",
      selected: true,
    },
    {
      icon: "star",
      label: "Label 2",
      id: "label2",
    },
    {
      icon: "star",
      label: "Label 3",
      id: "label3",
    },
  ];

  let selected = destinations.find((x) => x.selected).id;

  /**
   * @param {string} toDest
   */
  async function handleButtonPress(toDest) {
    if (toDest === selected) window.scrollTo({ top: 0, behavior: "smooth" });
    else window.location.href = "/app/" + toDest + "/";
    selected = toDest;
  }
</script>

<nav>
  {#each destinations as dest (dest.id)}
    <button
      id={dest.id}
      data-checked={selected === dest.id}
      on:click={() => {
        handleButtonPress(dest.id);
      }}
    >
      <span class="icon material-symbols-outlined">
        {dest.icon}
      </span>
      <span class="label">
        {dest.label}
      </span>
    </button>
  {/each}
</nav>

<style>
  nav {
    width: 100%;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-around;

    background-color: var(--color-surface);
    user-select: none;

    position: fixed;
    bottom: 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    height: 100%;
    width: 100%;
    padding: 12px 0 16px 0;

    appearance: none;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    position: relative;
    z-index: 0;

    color: var(--color-on-surface-variant);

    font-variation-settings: "FILL" 0, "GRAD" 55;
    transition: font-variation-settings 100ms var(--easing-standard);
  }

  .icon::before {
    content: "";
    width: 0;
    height: 32px;
    border-radius: 16px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    opacity: 0;
    background-color: var(--color-secondary-container);
    transition: width 200ms var(--easing-standard);
  }

  .label {
    color: var(--color-on-surface-variant);
    font-size: 12px;
    font-weight: 500;

    transition: font-weight 100ms var(--easing-standard);
  }

  [data-checked="true"] .icon {
    font-variation-settings: "FILL" 1, "GRAD" 55;
  }

  [data-checked="true"] .icon::before {
    width: 64px;
    opacity: 1;
    transition: width 200ms var(--easing-standard);
  }

  [data-checked="true"] .label {
    font-weight: 700;
  }

  :root {
    --navigation-bar-height: 80px;
  }
</style>
