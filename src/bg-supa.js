import { createClient } from "@supabase/supabase-js";
import localforage from "localforage";

try {
  (async () => {
    const SUPABASE_KEY = "YOUR.API.KEYS";
    const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: { fetch: fetch.bind(globalThis) },
      auth: {
        storage: localforage,
        persistSession: true,
      },
    });

    const handleMessage = async function (msg, sender, response) {
      console.log("handle message from", sender);
      if (msg.command == "logoutAuth") {
        let { error } = await supabase.auth.signOut();
        response({ type: "un-auth", status: "success", message: true });
      }
      if (msg.command == "checkAuth") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const firebaseUser = undefined; //firebase.auth().currentUser;
        if (user || firebaseUser) {
          // User is signed in.
          console.log("do we have a user", { firebaseUser, user });
          let { data: example, error } = await supabase
            .from("example")
            .select("*");

          response({
            type: "auth",
            status: "success",
            firebaseUser,
            message: user,
            data: example,
            error: error,
          });
        } else {
          // No user is signed in.
          response({ type: "auth", status: "no-auth", message: false });
        }
      }
      if (msg.command == "loginUser") {
        var email = msg.data.e;
        var pass = msg.data.p;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: pass,
        });

        const user = data?.user || null;

        if (user) {
          console.log("user", user);
          response({ type: "auth", status: "success", message: user });
        } else {
          console.log("error", error);
          // No user is signed in.
          response({ type: "auth", status: "no-auth", message: false });
        }
      }
      if (msg.command == "signupUser") {
        console.log(msg.data);
        var email = msg.data.e;
        var pass = msg.data.p;
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: pass,
        });
        const user = data?.user || null;

        if (user) {
          console.log("user", user);
          // User is signed in.
          response({ type: "auth", status: "success", message: user });
        } else {
          console.log("error", error);
          // No user is signed in.
          response({ type: "auth", status: "no-auth", message: false });
        }
      }
      return true;
    };

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      handleMessage(msg, sender, response);
      return true;
    });
  })();
} catch (e) {
  console.log("error", e);
}
