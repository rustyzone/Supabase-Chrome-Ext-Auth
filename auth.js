//AUTH.js
//Check user logged in
chrome.runtime.sendMessage({command: "checkAuth"}, (response) => {
  console.log(response);
  if(response.status == 'success'){
    document.querySelector('.loggedInArea').style.display='block';
    document.querySelector('.loggedInArea span').innerHTML = response.message.id;
  }else{
    document.querySelector('.loginArea').style.display='block';
  }
});

document.querySelector('.login-btn-auth').addEventListener('click', function(){
  loginFunc();
});
document.querySelector('.signup-btn-auth').addEventListener('click', function(){
  signupFunc();
});
document.querySelector('.logout-btn-auth').addEventListener('click', function(){
  logoutFunc();
});
var signupFunc = function(){
  //Get login details from form...
  var e = document.querySelector('.loginArea .signup-box input[type="email"]').value;
  var p = document.querySelector('.loginArea .signup-box input[type="password"]').value;
  chrome.runtime.sendMessage({command: "signupUser", data:{e: e, p: p}}, (response) => {
    console.log(response);
    document.querySelector('.loginArea').style.display='none';
    document.querySelector('.loggedInArea').style.display='none';
    if(response.status == 'success'){
      document.querySelector('.loggedInArea').style.display='block';
      document.querySelector('.loggedInArea span').innerHTML = response.message.id;
    }else{
      //add Errors
      document.querySelector('.loginArea').style.display='block';
    }
  });
}

var loginFunc = function(){
  //Get login details from form...
  var e = document.querySelector('.loginArea .login-box input[type="email"]').value;
  var p = document.querySelector('.loginArea .login-box input[type="password"]').value;
  chrome.runtime.sendMessage({command: "loginUser", data:{e: e, p: p}}, (response) => {
    console.log(response);
    document.querySelector('.loginArea').style.display='none';
    document.querySelector('.loggedInArea').style.display='none';
    if(response.status == 'success'){
      document.querySelector('.loggedInArea').style.display='block';
      document.querySelector('.loggedInArea span').innerHTML = response.message.id;
    }else{
      //add Errors
      document.querySelector('.loginArea').style.display='block';
    }
  });
}

var logoutFunc = function(){
  document.querySelector('.loggedInArea').style.display='none';
  document.querySelector('.loginArea').style.display='block';
  chrome.runtime.sendMessage({command: "logoutAuth"}, (response) => {
    //logout..
    console.log(response);
  });
}
