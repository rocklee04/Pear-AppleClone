  const loginText = document.querySelector(".title-text .login");
  const loginForm = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupLink = document.querySelector("form .signup-link a");

  
         signupBtn.onclick = (()=>{
           loginForm.style.marginLeft = "-50%";
           loginText.style.marginLeft = "-50%";
         });
         loginBtn.onclick = (()=>{
           loginForm.style.marginLeft = "0%";
           loginText.style.marginLeft = "0%";
         });
         signupLink.onclick = (()=>{
           signupBtn.click();
           return false;
         });

         let data = JSON.parse(localStorage.getItem("account-data"));
    if(data === null) {
      data = [];
    }
    let formEl = document.querySelector("form.signup");
    let nameInp = document.getElementById("name");
    let emailInp = document.getElementById("email");
    let passwordInp = document.getElementById("password");
    console.log(nameInp.value);
    
    formEl.addEventListener("submit", function(event) {
         event.preventDefault();
         console.log(nameInp.value);
         let obj = {
          name: nameInp.value,
          email: emailInp.value,
          password: passwordInp.value,
         }
         fetch("https://jealous-hare-umbrella.cyclic.app/users/register", {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj)
        })
        .then((res) => {
          if(res.ok) {
              return res.json()
          }
        })
        .then((res) => {
          console.log(res);
          for(let i = 0; i < data.length; i++) {
          
            if(emailInp.value == data[i].email) {
              alert("that username is already in use, please choose another")
              return
            }
            else if(passwordInp.value.length < 8) {
              alert("password is too short, atleast 8 characters")
              return;
            }
          } 
          alert("user successfully signed up.");
          window.location.href = './signIn.html';
        })
        .catch(error =>  alert("Invalid Credentials", JSON.stringify(error)));
         
        
       
        
        
        data.push(obj);
      localStorage.setItem("account-data", JSON.stringify(data));  
         
          
    })

    let LSdata = JSON.parse(localStorage.getItem("account-data"))
   
    let formE = document.querySelector("form.login");
    let email = document.getElementById("user")
        let password = document.getElementById("password1");


      formE.addEventListener("submit", function(event) {
        event.preventDefault();


       
          let obj ={
            email: loginUseremail.value,
            password: loginUserPassword.value
          };
        
          fetch("https://jealous-hare-umbrella.cyclic.app/users/login", {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
          })
          .then((res) => {
            if(res.ok) {
                return res.json()
            }
            throw new Error('Invalid credentials');
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem("localAccessToken", data.token);
            alert("user successfully logged in.");
            window.location.href = 'notes.html';
          })
          .catch(error =>  alert("Invalid Credentials", JSON.stringify(error)));
          
        
      });