<script>
  import MoodEmoticon from "/lib/MoodEmoticon.svelte";

  const ugNames = {
    1: "Freshman",
    2: "Sophomore",
    3: "Junior",
    4: "Senior",
  };

  // Firebase initialization
  import { firebaseConfig } from "/lib/firebase.js";
  import { initializeApp } from "firebase/app";
  import { getAuth, onAuthStateChanged, getIdTokenResult } from "firebase/auth";
  const fb = {
    config: firebaseConfig,
  };
  fb.app = initializeApp(fb.config);
  fb.auth = getAuth(fb.app);

  onAuthStateChanged(fb.auth, (user) => {
    console.log(user);
    fb.user = user;
    if (fb.user) {
      getIdTokenResult(fb.user).then((x) => {
        console.log(x.claims);
      });
    }
  });
</script>

<div class="content">
  {#if fb.user}
    <main>
      <header />
      <MoodEmoticon>You are</MoodEmoticon>
      <h1>{fb.user.displayName}</h1>
      {#await getIdTokenResult(fb.user) then user}
        <p>{user.claims.studentInfo.entryNo}</p>
        <p>{user.claims.studentInfo.degree}</p>
        <p>{user.claims.studentInfo.branch}</p>
        <p>
          {ugNames[
            user.claims.studentInfo.graduationYear -
              user.claims.studentInfo.year
          ]} year
        </p>
      {/await}

      <a href="/app">Continue</a>
    </main>
  {:else if fb.user === null}
    <h1>{window.location.assign("/")}</h1>
  {/if}
</div>
