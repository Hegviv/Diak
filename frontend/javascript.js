var url = "http://localhost:3000/view";
var id = "view";

async function generator(url, id) {
    var request = await new XMLHttpRequest()

request.open('GET', url, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
view(data, request, id);

}

request.send()
  }

  function view(data, request, id){
      if(id == "view"){
    if (request.status >= 200 && request.status < 400) {
         data.forEach((query) => {
          console.log(request.status);
          var div = document.createElement("tr");
            var mainContainer = document.getElementById(id);
          div.innerHTML = "<td>"+query.id+"</td><td><input id='vezetek"+query.id+"' placeholder='"+query.vezetek+"' value='"+query.vezetek+"'/></td><td><input id='kereszt"+query.id+"' placeholder='"+query.kereszt+"' value='"+query.kereszt+"'/></td><td><input id='email"+query.id+"' placeholder='"+query.email+"' value='"+query.email+"'/></td><td><input id='szulev"+query.id+"' placeholder='"+query.szulev+"' value='"+query.szulev+"'/></td><td><input id='osztaly"+query.id+"' placeholder='"+query.osztaly+"' value='"+query.osztaly+"'/></td>"+"<button onclick = 'torol("+query.id+")' type = 'submit' value='Submit'>Törlés</button>"+"<button onclick = 'frissit("+query.id+")'>Frissít</button>" ;
          mainContainer.appendChild(div)
        })
      } else {
        console.log('error')
      }}
  }

async function generate_html(){
await generator(url, id);
}

function torol(id){
  navigator.sendBeacon('http://localhost:3000/torol/'+ id);
  console.log(id);
}
function frissit(id){
  const data = id + ";"+ document.getElementById("vezetek"+id).value + ";"+ document.getElementById("kereszt"+id).value + ";"+ document.getElementById("email"+id).value  + ";"+ document.getElementById("szulev"+id).value + ";"+ document.getElementById("osztaly"+id).value;
  
  navigator.sendBeacon('http://localhost:3000/frissit/'+ data);
  console.log(data);
}

generate_html();