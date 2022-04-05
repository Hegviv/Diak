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
          div.innerHTML = "<td>"+query.id+"</td><td><input id='nev"+query.id+"' placeholder='"+query.nev+"' value='"+query.nev+"'/></td><td><input id='email"+query.id+"' placeholder='"+query.email+"' value='"+query.email+"'/></td><td><input id='cim"+query.id+"' placeholder='"+query.cim+"' value='"+query.cim+"'/></td><td><input id='kor"+query.id+"' placeholder='"+query.kor+"' value='"+query.kor+"'/></td><td><input id='kartya"+query.id+"' placeholder='"+query.kartya+"' value='"+query.kartya+"'/></td>"+"<button onclick = 'torol("+query.id+")' type = 'submit' value='Submit'>Delete</button>"+"<button onclick = 'update("+query.id+")'>Update</button>" ;
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
function update(id){
  const data = id + ";"+ document.getElementById("nev"+id).value + ";"+ document.getElementById("email"+id).value + ";"+ document.getElementById("cim"+id).value  + ";"+ document.getElementById("kor"+id).value + ";"+ document.getElementById("kartya"+id).value;
  
  navigator.sendBeacon('http://localhost:3000/update/'+ data);
  console.log(data);
}

generate_html();