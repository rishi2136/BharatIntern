const form = document.querySelector(".wages_form");
const addBtn = document.querySelector(".add_btn");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("I am from the static file", this);
  this.submit();
  this.reset();
})




// form.addEventListener("submit", async function (event) {
//   event.preventDefault();
//   console.log("form is submitted");
//   // Gather form data
//   const formData = new FormData(this);

//   // Convert form data to JSON
//   const data = {};
//   formData.forEach((value, key) => {
//     data[key] = value;
//   });
//   console.log(data);
//   try {
//     // Use Fetch API to send data to the server
//     let res = await fetch('http://localhost:3001/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     let newData = await res.json();
//     if (newData.errors) {
//       console.log(newData.errors)
//       return;
//     }
//     console.log(newData);
//   } catch (err) {
//     alert(err.message);
//   }
//   this.reset();
//   location.reload();
// })





// let fetchData = async () => {
//   let res = await fetch("http://localhost:3001/data", {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })
//   let data = await res.json();
//   console.log(data)
//   console.dir(tableBody);
//   for (let elt of data) {
//     let tr = document.createElement("tr");
//     // tr.style.display = "flex"
//     // tr.style.justifyContent = "space-evenly"

//     tableBody.appendChild(tr);
//     console.log(elt);
//     let count = 0;
//     for (let key in elt) {
//       let schema = ["amount", "info", "date", "wealth_type"];
//       if (elt.hasOwnProperty(key)) {
//         if (key === "_id") {
//           let td = document.createElement("td");
//           let delBtnForm = document.createElement("form");
//           delBtnForm.setAttribute("method", "post");
//           delBtnForm.setAttribute("action", `/delete/${elt[key]}?_method=DELETE`);
//           let btn = document.createElement("button");
//           btn.classList.add("del_btn");
//           btn.classList.add("my_btn");
//           btn.innerText = "Delete";
//           td.style.order = "5";
//           td.appendChild(delBtnForm);
//           delBtnForm.appendChild(btn);
//           tr.appendChild(td);
//         }


//         if (schema.includes(key) === true) {
//           let td = document.createElement("td");
//           if (key === "date") {
//             let value = elt[key];
//             let readableDate = new Date(value).toString().split(" ").slice(0, 4).join(" ");
//             td.textContent = readableDate;
//             td.style.order = `${i++}`;
//             console.log(readableDate);
//           } else {
//             td.textContent = elt[key];
//           }
//           tr.appendChild(td)
//         }
//       }

//       i = 1;
//     }


//   }
// }



// fetchData()







