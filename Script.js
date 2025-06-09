// script.js

// Create modal for adding/viewing contact
const createModal = (id, title, contentHtml) => {
    const modal = document.createElement("div");
    modal.id = id;
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            ${contentHtml}
            <button class="btn close-btn">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-btn").onclick = () => modal.remove();
};

// Show Add Contact form
document.querySelectorAll(".btn")[0].onclick = () => {
    createModal("addModal", "Add Contact", `
        <form id="contactForm">
            <input type="text" id="name" placeholder="Name" required><br><br>
            <input type="text" id="phone" placeholder="Phone" required><br><br>
            <input type="email" id="email" placeholder="Email" required><br><br>
            <button type="submit" class="btn">Save</button>
        </form>
    `);

    document.getElementById("contactForm").onsubmit = function (e) {
        e.preventDefault();
        const contact = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
        };
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        alert("Contact saved!");
        document.getElementById("addModal").remove();
    };
};

// Show contact list
document.querySelectorAll(".btn")[1].onclick = () => {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    if (contacts.length === 0) {
        createModal("viewModal", "View Contacts", `<p>No contacts found.</p>`);
        return;
    }

    const listHtml = contacts.map((c, i) => `
        <div class="contact">
            <strong>${c.name}</strong><br>
            Phone: ${c.phone}<br>
            Email: ${c.email}<br>
            <button class="btn delete-btn" data-index="${i}">Delete</button>
            <hr>
        </div>
    `).join("");

    createModal("viewModal", "View Contacts", `<div>${listHtml}</div>`);

    // Delete contact handler
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = () => {
            const index = btn.dataset.index;
            contacts.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            document.getElementById("viewModal").remove();
            alert("Contact deleted.");
        };
    });
};
