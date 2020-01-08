console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form"); // Selects the form
const search = document.querySelector("input"); // Selects the input
const messageOne = document.querySelector("#message-1");
let messageTwo = document.querySelector("#message-2");


weatherForm.addEventListener("submit", (e) => { // "e" stands for event
    e.preventDefault();
    const location = search.value; // Stores the input value

    messageOne.textContent = "Loading..."; // Loading will display until the error or weather info is returned
    messageTwo.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        // Fetch not accessible in node, Browser only API
        response.json().then(data => {
            if (data.error) messageOne.textContent = `${data.error}`;
            messageOne.textContent = `${data.name}`;
            messageTwo.textContent = `${data.weather}`;
        });
    });
});
