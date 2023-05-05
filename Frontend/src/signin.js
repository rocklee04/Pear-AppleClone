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
         console.log(obj)
         
        
       
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
        if(Object.keys(obj).length == 3){

          alert("Sign up Successful");
          setTimeout(() => {
          location.replace("./signIn.html");
          }, 1000);


        }
        data.push(obj);
      localStorage.setItem("account-data", JSON.stringify(data));  
         
          
    })

    let LSdata = JSON.parse(localStorage.getItem("account-data"))
   
    let formE = document.querySelector("form.login");
    let email = document.getElementById("user")
        let password = document.getElementById("password1");

        console.log(email.value, password.value)

      formE.addEventListener("submit", function(event) {
        event.preventDefault();


        
        
        
        console.log(email, password)

        let flag =false;

        LSdata.forEach(function(el) {
          
          if(el.email == email.value && el.password == password.value) {

            flag = true;
            
          }
        });



        if(flag){

          alert("Log in Successful");
          setTimeout(() => {
        location.replace("./index.html");
        }, 1000);

        }
        else {

          alert("Wrong Credentials");

        }
      });