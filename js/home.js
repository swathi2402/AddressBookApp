let contactList;
window.addEventListener("DOMContentLoaded", (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getContactDataFromStorage();
    } else 
        getContactDataFromServer();
});

const getContactDataFromServer = () => {
    makePromisecall("GET", site_properties.server_url, true)
        .then(responseText => {
            contactList = JSON.parse(responseText);
            processContactDataResponce();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            contactList = [];
            processContactDataResponce();
        })
}

const processContactDataResponce = () => {
    createInnerHtml();
    localStorage.removeItem('editContact');
}

const getContactDataFromStorage = () => {
    contactList = localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processContactDataResponce();
}

const createInnerHtml = () => {
    const headerHtml = "<th>Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Coode</th><th>Phone Number</th><th>Actions</th>"
    if (contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactList) {
        innerHtml += `
            <tr>
                <td>${contactData._name}</td>
                <td>${contactData._address}</td>
                <td>${contactData._city}</td>
                <td>${contactData._state}</td>
                <td>${contactData._zipCode}</td>
                <td>${contactData._phoneNumber}</td>
                <td>
                    <img id="${contactData.id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                    <img id="${contactData.id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contactData = contactList.find((contact) => contact.id == node.id);
    if (!contactData) return;
    const index = contactList
                    .map((contact) => contact.id)
                    .indexOf(contactData.id);
    contactList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")) {
        localStorage.setItem("AddressBookList", JSON.stringify(contactList));
        createInnerHtml();
    } else {
        const deleteUrl = site_properties.server_url + contactData.id.toString();
        makePromisecall("DELETE", deleteUrl, false)
        .then(responseText => {
            createInnerHtml();
        })
        .catch (error => {
            console.log("DELETE Error Status: " + JSON.stringify(error)); 
        });
    }
};

const update = (node) => {
    let contactData = contactList.find((contact) => contact.id == node.id);
    if (!contactData) return;
    localStorage.setItem("editContact", JSON.stringify(contactData));
    window.location.replace(site_properties.add_contact_page);
};