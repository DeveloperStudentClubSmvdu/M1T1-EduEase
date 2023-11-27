<script>
  import "./style.css";
  import FAB from "/lib/FAB.svelte";
  import Header from "/lib/Header.svelte";
  import UploadUi from "/components/UploadUi.svelte";
</script>

<input type="text" />

<p>
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita dolorem
  ipsum quibusdam iste cumque, suscipit fugit quis perferendis possimus
  voluptatibus mollitia, doloremque assumenda fugiat culpa adipisci magnam
  distinctio ullam illo.
</p>

<FAB icon="upload" label="Upload">
  <div
  let:expand
  on:click={() => expand(false)}
  >
    <Header
      type="center"
      leading_icons={[{ icon: "close" }]}
      label="Upload"
    />
    <UploadUi />
  </div>
</FAB>
