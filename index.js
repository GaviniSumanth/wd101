let dateInput = document.getElementById("dob");
dateInput.setAttribute(
  "min",
  new Date(new Date().setFullYear(new Date().getFullYear() - 55))
    .toISOString()
    .split("T")[0]
);
dateInput.setAttribute(
  "max",
  new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    .toISOString()
    .split("T")[0]
);
let userForm = document.getElementById("user-form");
const saveUserForm = (event) => {
  event.preventDefault();
  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    date: document.getElementById("dob").value,
    terms: document.getElementById("terms").checked,
  };
  if (localStorage.getItem("UserData")) {
    let value = JSON.parse(localStorage.getItem("UserData"));
    value.push(data);
    localStorage.setItem("UserData", JSON.stringify(value));
  } else {
    localStorage.setItem("UserData", JSON.stringify([data]));
  }
  setUserData();
};
userForm.addEventListener("submit", saveUserForm);

const setUserData = () => {
  let data = localStorage.getItem("UserData");
  if (data) data = JSON.parse(data);
  else data = [];
  const getItem = (val) => "\t<td>" + val + "</td>\n";
  const getItems = (entries) => {
    let s = "";
    entries.map((entry, index) => {
      //   s += "\t<td>" + (index + 1) + "</td>\n";
      let keys = Object.keys(entry);
      keys.forEach((item) => (entry[item] = getItem(entry[item])));
      for (let i = 0; i < keys.length; i++) {
        s += entry[keys[i]];
      }
      s = s + "</tr>\n<tr>\n";
    });
    return "<tr>\n" + s;
  };
  // Setting the data
  let head =
    '<tr class="text-left">\n\t<th>Name</th>\n\t<th>Email</th>\n\t<th>Password</th>\n\t<th>Dob</th>\n\t<th>Accepted terms?</th>\n</tr>\n';
  let tableString = head + getItems(data);
  let userData = document.getElementById("user-data");
  userData.innerHTML = tableString;
};
setUserData();
