<script>
  export let icon = "star";
  export let action = () => {};
</script>

<button on:click={action} class="material-symbols-outlined">{icon}</button>

<style>
  button {
    width: 40px;
    height: 40px;

    color: var(--color-on-surface-variant);
    border-radius: 100vmax;
    overflow: hidden;

    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
  }

  @media (pointer: fine) {
      button:hover::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--color-on-surface-variant);
        opacity: 0.08;
        z-index: -1;
      }
      button:active::after {
        opacity: 0.1;
      }
  }
</style>
