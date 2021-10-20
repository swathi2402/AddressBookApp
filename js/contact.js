let isUpdate = false;
let contactObj = {};

submitButton = document.getElementById('addButton');
submitButton.disabled = true;
window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.getElementById("name");
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.name-error', "");
            return;
        }
        try {
            checkName(name.value);
            setTextValue('.name-error', "");
            activateButton();
        } catch (e) {
            setTextValue('.name-error', e);
            disableButton()
        }
    });

    const tel = document.querySelector('#phoneNumber');
    tel.addEventListener('input', function () {
        if (tel.value.length == 0) {
            setTextValue('.tel-error', "");
            return;
        }
        try {
            checkPhoneNumber(tel.value);
            setTextValue('.tel-error', "");
            activateButton();
        } catch (e) {
            setTextValue('.tel-error', e);
            disableButton()
        }
    });

    const zip = document.querySelector('#zip');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            setTextValue('.zip-error', "");
            return;
        }
        try {
            checkZip(zip.value);
            setTextValue('.zip-error', "");
            activateButton();
        } catch (e) {
            setTextValue('.zip-error', e);
            disableButton()
        }
    });

    const address = document.querySelector('#address');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            setTextValue('.address-error', "");
            return;
        }
        try {
            checkAddress(address.value);
            setTextValue('.address-error', "");
            activateButton();
        } catch (e) {
            setTextValue('.address-error', e);
            disableButton()
        }
    });

    checkForUpdate();
});

function activateButton() {
    submitButton.classList.remove("submitButton-disabled");
    submitButton.classList.add("submitButton");
    submitButton.disabled = false;
}

function disableButton() {
    submitButton.classList.add("submitButton-disabled");
    submitButton.classList.remove("submitButton");
}

const save = (event) => {
    console.log("Hello");
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        if(site_properties.use_local_storage.match("true")) { 
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createOrUpdateAddressBook();
        }
    } catch (error) {
        return;
    }
}

const createOrUpdateAddressBook = () => {
    let postUrl = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postUrl = postUrl + contactObj.id.toString();
    }
    makePromisecall(methodCall, postUrl, true, contactObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch (error => {
            throw error();
        });
}


const setContactObject = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")) { 
        contactObj.id = createNewContactId();
    }
    contactObj._name = getInputValueById('#name');
    contactObj._phoneNumber = getInputValueById("#phoneNumber");
    contactObj._address = getInputValueById("#address");
    contactObj._city = getInputValueById("#city");
    contactObj._state = getInputValueById("#state");
    contactObj._zipCode = getInputValueById("#zip");
}


const createContact = () => { 
    let contactData = new AddressBook();
    try {
        contactData.name = getInputValueById("#name");
    } catch (error) {
        setTextValue('.name-error', error);
        throw error;
    }
    try {
        contactData.phoneNumber = getInputValueById("#phoneNumber");
        contactData.address = getInputValueById("#address");
        contactData.city = getInputValueById("#city");
        contactData.state = getInputValueById("#state");
        contactData.zipCode = getInputValueById("#zip");
        contactData.id = new Date().getTime();
        alert(contactData.toString());
        return contactData;
    } catch (error) {
        alert(error);
    }
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage() {
    let contactList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(contactList) {
        let contactData = contactList.find((contact) => contact.id == contactObj.id);
        if (!contactData){
            contactList.push(contactObj);
        } else {
            const index = contactList
                    .map((contact) => contact.id)
                    .indexOf(contactData.id);
            contactList.splice(index, 1, contactObj);
        }
    } else {
        contactList =  [contactObj]
    }
    alert(contactList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(contactList));
}

const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactId");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactId", contactId);
    return contactId;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#address', '');
    setValue('#phoneNumber', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
    setTextValue('.name-error', '');
    setTextValue('.tel-error', '');
    setTextValue('.zip-error', '');
    setTextValue('.address-error', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem("editContact");
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    contactObj = JSON.parse(addressBookJson);
    setForm();
};

const setForm = () => {
    setValue("#name", contactObj._name);
    setValue("#address", contactObj._address);
    setValue("#phoneNumber", contactObj._phoneNumber);
    setValue("#city", contactObj._city);
    setValue("#state", contactObj._state);
    setValue("#zip", contactObj._zipCode);
};