function lengths(){
    let pass = document.getElementById('pass').value;
    let cpass = document.getElementById('cpass').value;
    let error = document.getElementById('error');
    let form = document.getElementById('form');
        if(pass.length<4){ 
         error.innerText="Password must be 4 Character or more";        
        }
    let error1 = document.getElementById('error1');    
        if(pass!= cpass){
          error1.innerText="Password do not match";   
            
        }
       if(pass.length>=4 && pass==cpass) {
           form.submit();
           alert("Submitted ");
          
       }
    }