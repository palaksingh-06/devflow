fetch("http://127.0.0.1:2000/api/v2/execute", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    language: "c++",
    version: "10.2.0",
    files: [
      {
        name: "main.cpp",
        content: "#include <iostream>\nint main() { std::cout << \"Hello from C++\"; return 0; }"
      }
    ]
  })
})
.then(async r => console.log(r.status, await r.text()))
.catch(console.error);
