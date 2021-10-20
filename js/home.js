let contactList;
window.addEventListener("DOMContentLoaded", (event) => {
    contactList = getContactDataFromStorage();
    createInnerHtml();
});

const getContactDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th>Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Coode</th><th>Phone Number</th><th></th>"
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
                    <img id="${contactData._id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                    <img id="${contactData._id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}
