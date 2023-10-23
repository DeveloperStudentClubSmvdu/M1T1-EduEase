<div class="content">
  <header />

  <main>
    <MoodEmoticon>(^o^) /</MoodEmoticon>

    <h1>Welcome to SMVDU Student Hub!</h1>

    <p>
      Witness a new level of quality-of-life features.
      Sign in with your uajsnniversity email to continue.
    </p>

    {#if fb.user}
        <VerticalChoiceList
        choiceList={[
            {
                text: `Sign in as ${fb.user.displayName}`,
                href: "/app",
                name: "app",
                highlight: true
            },
            {
                text: "<span class='light'>or</span> <u>explore the hub!</u>",
                href: "/explore",
                name: "explore"
            }
        ]}
        />
    {:else}
        <VerticalChoiceList
        choiceList={[
            {
                text: "Get started",
                action: fb.signin,
                name: "get-started",
                highlight: true
            },
            {
                text: "<span class='light'>or</span> <u>explore the hub first!</u>",
                href: "/explore",
                name: "explore"
            },
            {
                text: "<span class='light'>or</span> <u>continue as guest</u>",
                href: "/app",
                name: "app"
            }
        ]}
        />
    {/if}
  </main>
</div>

<style>
    .content {
        width: 85%;
        min-height: 100%;
        margin: auto;
        padding: 2em 0 2em 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    header {
        height: 48px;
        /* background-color: red; */
    }
</style>

<script>
    import MoodEmoticon from "./lib/MoodEmoticon.svelte";
    import VerticalChoiceList from "./lib/VerticalChoiceList.svelte";

    import { firebaseConfig } from "./lib/firebase.js";
    import { initializeApp } from 'firebase/app'
    import { getIdTokenResult, getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    const fb = {
        config: firebaseConfig,
    }
    fb.app = initializeApp(fb.config);
    fb.auth = getAuth(fb.app);

    onAuthStateChanged(fb.auth, user => {
        fb.user = user;
        console.log(fb.user);
    })

    fb.signin = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            login_hint: '2xxxx@smvdu.ac.in'
        })

        try {
            const result = await signInWithPopup(fb.auth, provider);
            fb.user = result.user;
            if (fb.user) {
                window.location.assign("/app")
            }
            console.log(user);
        }
        catch (err) {
            console.log(err)
            console.log('Error code: ', err.code);
            console.log('Error message: ', err.message);
        }
    }
</script>