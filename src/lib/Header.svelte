<script>
  import IconButton from "/lib/IconButton.svelte";

  export let type = "center";
  export let label = "Label";
  export let leading_icons = [];
  export let trailing_icons = [];
</script>

<nav data-type={type}>
  <span class="leading-icons">
    {#each leading_icons as icon (icon.icon)}
      <IconButton icon={icon.icon} />
    {/each}
  </span>

  <span class="label">{label}</span>

  <span class="trailing-icons">
    {#each trailing_icons as icon (icon.icon)}
      <IconButton icon={icon.icon} action={icon.action} />
    {/each}
  </span>
</nav>

<style>
  nav[data-type="center"] {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 0 12px;

    height: 64px;
    background: var(--color-surface);
  }

  .label {
    font-size: 22px;
    font-weight: 400;
    line-height: 28px;
    color: var(--color-on-surface);
  }

  .leading-icons,
  .trailing-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 40px;
  }

  .leading-icons {
    color: var(--color-on-surface);
  }

  .trailing-icons {
    color: var(--color-on-surface-variant);
  }

</style>
