document.querySelector("#signup-form").addEventListener("submit",e=>{
        e.preventDefault();
        const signupObj = {
            username:document.querySelector("#signup-username").value,
            password:document.querySelector("#signup-password").value
        }
        fetch("/api/users/",{
            method:"POST",
            body:JSON.stringify(signupObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.href="/dashboard"
            } else {
                alert("trumpet sound")
            }
        })
    })