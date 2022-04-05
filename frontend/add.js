
function sendPost(){
    const data = document.getElementById("nev").value+";"+document.getElementById("email").value+";"+document.getElementById("cim").value+";"+document.getElementById("kor").value+";"+document.getElementById("kartya").value;
    console.log(data);
      navigator.sendBeacon('http:localhost:3000/friss/'+ data);
      console.log(data);
    }
