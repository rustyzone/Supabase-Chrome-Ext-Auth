


const SUPABASE_KEY = 'YOUR.API.KEYS';
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co"
const { createClient } = supabase;
supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

 console.log('supabase?', supabase);



const handleMessage = async function(msg, sender, response){
  console.log('handle...');
  if(msg.command == 'logoutAuth'){
    let { error } = await supabase.auth.signOut();
    //check for error here.. then choose response..
    response({type: "un-auth", status: "success", message: true});
  }
  if(msg.command == 'checkAuth'){
    var user = await supabase.auth.user();
    if (user) {
      // User is signed in.
      response({type: "auth", status: "success", message: user});
    } else {
      // No user is signed in.
      response({type: "auth", status: "no-auth", message: false});
    }
  }
  if(msg.command == 'loginUser'){
    console.log(msg.data);
    var email = msg.data.e;
    var pass = msg.data.p;
    let { user, error } = await supabase.auth.signIn({
      email: email,
      password: pass
    });
    console.log(error, user);
    if (user) {
      // User is signed in.
      response({type: "auth", status: "success", message: user});
    } else {
      // No user is signed in.
      response({type: "auth", status: "no-auth", message: false});
    }
  }
  if(msg.command == 'signupUser'){
    console.log(msg.data);
    var email = msg.data.e;
    var pass = msg.data.p;
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: pass
    });
    console.log(error, user);
    if (user) {
      // User is signed in.
      response({type: "auth", status: "success", message: user});
    } else {
      // No user is signed in.
      response({type: "auth", status: "no-auth", message: false});
    }
  }
  return true;
}


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  handleMessage(msg, sender, response);
  return true;
});
