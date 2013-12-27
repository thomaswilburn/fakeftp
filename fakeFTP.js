var net = require("net");

var faker = function(c) {

  console.log("connected");

  var state = "connected";
  
  c.setEncoding("utf8");
  
  c.write("220 Hello " + process.env.HOSTNAME + "\n");
  
  var responses = {
    user: "331 Password required",
    password: true,
    pass: true,
  };
  
  c.on("data", function(data) {
    var line = data.replace(/\n|\r/g, "");
    console.log(">>", line);
    var command = line.split(" ")[0].toLowerCase();
    console.log("*" + command + "*", responses[command]);
    if (responses[command]) {
      if (typeof responses[command] == "string") return c.write(responses[command] + "\n");
      c.end();
    } else {
      c.write("221 I don't understand.");
    }
  });

};

var server = net.createServer(faker);

var port = 8821;
server.listen(port, function() {
  console.log("Bound to port " + port);
});
