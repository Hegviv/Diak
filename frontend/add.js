
function sendPost(){
    const data = document.getElementById("vezetek").value+";"+document.getElementById("kereszt").value+";"+document.getElementById("email").value+";"+document.getElementById("szulev").value+";"+document.getElementById("osztaly").value;
    console.log(data);
      navigator.sendBeacon('http:localhost:3000/friss/'+ data);
      console.log(data);
    }
