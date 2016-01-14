var configs = [
{
  "ENTRY": [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src"
  ],
  "baseUrl": "https://equinix-dev.herokuapp.com",
},
{
  "ENTRY": ["./src"],
  "baseUrl": "https://equinix-dev.herokuapp.com",
}
]

module.exports = function(){
  return configs[0];
}
