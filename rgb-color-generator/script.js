function start(){
    let color = document.getElementById('color');
    let x = Math.floor(Math.random() *256);
    let y = Math.floor(Math.random() *256);
    let z = Math.floor(Math.random() *256);
    let bg ="rgb("+x+","+y+","+z+")";
    document.getElementById("rgb").innerText=bg;
    color.style.backgroundColor=bg;
    }