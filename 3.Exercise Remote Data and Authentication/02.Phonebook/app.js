function attachEvents() {
  const mainUrl = "http://localhost:3030/jsonstore/phonebook/";
  const phoneBook = document.getElementById("phonebook");
  const loadBtn = document
    .getElementById("btnLoad")
    .addEventListener("click", onLoad);
  const personInput = document.getElementById("person");
  const phoneInput = document.getElementById("phone");
  const createBtn = document
    .getElementById("btnCreate")
    .addEventListener("click", onCreate);
  async function onLoad() {
    phoneBook.innerHTML = "";
    personInput.value = "";
    phoneInput.value = "";
    const response = await fetch(mainUrl);
    const data = await response.json();
    createPhoneBook(data);
  }
  function createPhoneBook(data) {
    const values = Object.entries(data).forEach((element) => {
      const [key, text] = element;
      const liEl = document.createElement("li");
      liEl.textContent = `${text.person}: ${text.phone}`;

      const deleteBtn = document.createElement("button");
      liEl.appendChild(deleteBtn);
      phoneBook.appendChild(liEl);
      deleteBtn.addEventListener("click", onDelete.bind(null, key));
      deleteBtn.textContent = "Delete";
    });
  }
  async function onDelete(key) {
    const response = await fetch(mainUrl + key, {
      method: "DELETE",
      header: { "Content-type": "application/json" },
    });
    onLoad();
  }
  async function onCreate(params) {
    const person = personInput.value;
    const phone = phoneInput.value;
    const data = {
      person: `${person}`,
      phone: `${phone}`,
    };

    const response = await fetch(mainUrl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}

attachEvents();
