function showPassword() {
  let password = document.getElementById("mk");
  let icon = document.getElementById("icon");

  if (password.type == "password") {
    password.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function showConfirmPassword() {
  let showConfirmPassword = document.getElementById("remk");
  let iconClose = document.getElementById("iconClose");
  if (showConfirmPassword.type == "password") {
    showConfirmPassword.type = "text";
    iconClose.classList.remove("fa-eye");
    iconClose.classList.add("fa-eye-slash");
  } else {
    showConfirmPassword.type = "password";
    iconClose.classList.remove("fa-eye-slash");
    iconClose.classList.add("fa-eye");
  }
}
function checkUserName(username) {
  let re = /^[a-zA-Z0-9\-]+$/;
  if (re.test(username)) {
    return true;
  } else {
    return false;
  }
}
function checkMail(mail) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(mail)) {
    return true;
  } else {
    return false;
  }
}
let information = [];

function register() {
  let username = document.getElementById("tk").value;
  let errorUserName = document.getElementById("spantk");
  let mail = document.getElementById("email").value;
  let pass = document.getElementById("mk").value;
  let passConfirm = document.getElementById("remk").value;

  if (checkUserName(username) == false) {
    errorUserName.setAttribute("style", "display:block; color:blue");
  } else {
    errorUserName.setAttribute("style", "display:none");
  }

  if (checkMail(mail) == false) {
    document.getElementById("spanemail").style.display = "block";
    document.getElementById("spanemail").style.color = "blue";
  } else {
    document.getElementById("spanemail").style.display = "none";
  }

  let off = document.getElementById("emailExits");
  off.setAttribute("style", "display:none");
  let p = document.getElementById("spanmk");
  // console.log(pass);
  if (pass.length < 6 || pass.indexOf(" ") != -1) {
    p.setAttribute("style", "display:block;color:blue");
  } else {
    p.setAttribute("style", "display:none");
    let pConfirm = document.getElementById("spanremk");

    if (passConfirm !== pass) {
      pConfirm.setAttribute("style", "display:block;color:blue");
      document.getElementById("remk").value = "";
    } else {
      pConfirm.setAttribute("style", "display:none");
    }
  }

  if (
    checkUserName(username) == true &&
    checkMail(mail) == true &&
    (pass.length >= 6 || pass.indexOf(" ") == -1) &&
    pass == passConfirm
  ) {
    let obj = {
      username: username,
      email: mail,
      password: pass,
    };
    let getInformation = localStorage.getItem("information");
    console.log(obj);
    if (getInformation == null) {
      information.push(obj); // if = [username:username;]
      localStorage.setItem("information", JSON.stringify(information));
      window.location.href = "login.html";
    } else {
      let getInformation = localStorage.getItem("information");
      getInformation = JSON.parse(getInformation);

      let emailExits = document.getElementById("emailExits");
      let flag = false;
      for (let i = 0; i < getInformation.length; i++) {
        if (obj.email == getInformation[i].email) {
          console.log("Trùng email");
          emailExits.setAttribute("style", "display:block;color:red");

          return;
        } else {
          flag = true;
        }
      }
      if (flag == true) {
        emailExits.setAttribute("style", "display:none");
        getInformation.push(obj); // {[username....;email....;password....,]}
        localStorage.setItem("information", JSON.stringify(getInformation));
        document.getElementById("email").value = "";
        document.getElementById("tk").value = "";
        document.getElementById("mk").value = "";
        document.getElementById("remk").value = "";

        window.location.href = "login.html";
      }
    }
  }
}

function register2() {
  window.location.href = "login.html";
}
