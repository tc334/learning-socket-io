console.log("Hello, World!");
const host = "192.168.1.74";
const port = 5000;
const base_uri = "http://" + host + ":" + port + "/";

var socket = io(base_uri);
socket.on("connect", function () {
  socket.emit("joined", { data: "Client is connected!" });
});

socket.on("new_data", function (msg) {
  console.log("New message received:" + msg);
  const msg_json = JSON.parse(msg);
  var d = document.getElementById("div_existing");
  removeAllChildNodes(d);
  for (var i = 0; i < msg_json.length; i++) {
    var div_one_pond = document.createElement("div");
    div_one_pond.classList.add("div__pond_existing");
    var div_name = document.createElement("div");
    div_name.innerHTML = msg_json[i]["pond"];
    div_name.classList.add("div__name_existing");
    div_one_pond.appendChild(div_name);
    var inp_count = document.createElement("input");
    inp_count.type = "number";
    inp_count.value = msg_json[i]["count"];
    inp_count.classList.add("inp__count_existing");
    div_one_pond.appendChild(inp_count);

    d.appendChild(div_one_pond);
  }
});

document.getElementById("btn").addEventListener("click", () => {
  console.log("Button clicked");
  // First grab data from the new pond
  const new_pond_name = document.getElementById("inp__new_pond").value;
  const new_pond_count = document.getElementById("inp__new_count").value;
  let pond_data = [];
  if (new_pond_name.length > 1 && new_pond_count.length > 0) {
    const i_count = parseInt(new_pond_count);
    if (i_count > 0 && i_count < 25) {
      console.log("Adding new pond");
      pond_data.push({
        pond: new_pond_name,
        count: i_count,
      });
    } else {
      console.log("Invalid input values");
    }
  } else {
    console.log("No new pond to add");
  }

  // now go through the existing ponds
  const existing = document.getElementById("div_existing").children;
  for (var i = 0; i < existing.length; i++) {
    const one_pond = existing[i];
    const pond_children = one_pond.children;
    const pond_name = pond_children[0];
    const pond_count = pond_children[1];
    pond_data.push({
      pond: pond_name.innerHTML,
      count: parseInt(pond_count.value),
    });
  }

  console.log("Alpha:" + JSON.stringify(pond_data));
  document.getElementById("inp__new_pond").value = "";
  document.getElementById("inp__new_count").value = "";
  socket.emit("update", JSON.stringify(pond_data));
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
