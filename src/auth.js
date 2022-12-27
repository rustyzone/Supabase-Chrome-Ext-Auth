//AUTH.js
//Check user logged in
chrome.runtime.sendMessage({ command: "checkAuth" }, (response) => {
  document.querySelector(".loading").style.display = "none";
  if (chrome.runtime.lastError) {
    // Something went wrong
    console.warn("Whoops.. " + chrome.runtime.lastError.message);
  }
  console.log(response);
  if (response && response.status == "success") {
    document.querySelector(".loggedInArea").style.display = "block";
    document.querySelector(".loggedInArea span").innerHTML =
      response?.message?.id || response.firebaseUser.uid;
  } else {
    document.querySelector(".loginArea").style.display = "block";
  }
});

document
  .querySelector(".login-btn-auth")
  .addEventListener("click", function () {
    document.querySelector(".loading").style.display = "block";
    loginFunc();
  });
document
  .querySelector(".signup-btn-auth")
  .addEventListener("click", function () {
    document.querySelector(".loading").style.display = "block";
    signupFunc();
  });
document
  .querySelector(".logout-btn-auth")
  .addEventListener("click", function () {
    document.querySelector(".loading").style.display = "block";
    logoutFunc();
  });
var signupFunc = function () {
  //Get login details from form...
  var e = document.querySelector(
    '.loginArea .signup-box input[type="email"]'
  ).value;
  var p = document.querySelector(
    '.loginArea .signup-box input[type="password"]'
  ).value;
  chrome.runtime.sendMessage(
    { command: "signupUser", data: { e: e, p: p } },
    (response) => {
      document.querySelector(".loading").style.display = "none";
      if (chrome.runtime.lastError) {
        // Something went wrong
        console.warn("Whoops.. " + chrome.runtime.lastError.message);
      }
      console.log(response);
      document.querySelector(".loginArea").style.display = "none";
      document.querySelector(".loggedInArea").style.display = "none";
      if (response.status == "success") {
        document.querySelector(".loggedInArea").style.display = "block";
        document.querySelector(".loggedInArea span").innerHTML =
          response?.message?.id || response.firebaseUser.uid;
      } else {
        //add Errors
        document.querySelector(".loginArea").style.display = "block";
      }
    }
  );
};

var loginFunc = function () {
  //Get login details from form...
  var e = document.querySelector(
    '.loginArea .login-box input[type="email"]'
  ).value;
  var p = document.querySelector(
    '.loginArea .login-box input[type="password"]'
  ).value;
  chrome.runtime.sendMessage(
    { command: "loginUser", data: { e: e, p: p } },
    (response) => {
      document.querySelector(".loading").style.display = "none";
      if (chrome.runtime.lastError) {
        // Something went wrong
        console.warn("Whoops.. " + chrome.runtime.lastError.message);
      }
      console.log(response);
      document.querySelector(".loginArea").style.display = "none";
      document.querySelector(".loggedInArea").style.display = "none";
      if (response.status == "success") {
        document.querySelector(".loggedInArea").style.display = "block";
        document.querySelector(".loggedInArea span").innerHTML =
          response?.message?.id || response.firebaseUser.uid;
      } else {
        //add Errors
        document.querySelector(".loginArea").style.display = "block";
      }
    }
  );
};

var logoutFunc = function () {
  document.querySelector(".loggedInArea").style.display = "none";
  document.querySelector(".loginArea").style.display = "block";
  chrome.runtime.sendMessage({ command: "logoutAuth" }, (response) => {
    document.querySelector(".loading").style.display = "none";
    if (chrome.runtime.lastError) {
      // Something went wrong
      console.warn("Whoops.. " + chrome.runtime.lastError.message);
    }
    //logout..
    console.log(response);
  });
};
