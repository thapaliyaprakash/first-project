function input(val){
    document.getElementById("input").value+=val;
          }
          
      function clean(){
       document.getElementById("input").value="";  
          } 
          
          function calculate(){
             var v = document.getElementById('input').value;   
             
             // Checking if input field is empty         
             if(v==""){
             alert("Please Enter Your Calculation");
             return 0;
             }          
             var r = eval(v);
             document.getElementById('input').value=r;
          }