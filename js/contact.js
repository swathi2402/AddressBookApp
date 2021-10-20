let isUpdate = false;
let contactObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.getElementById("name");
    const textError = document.querySelector(".name-error");
    name.addEventListener('input', function () {
      if (name.value.length == 0) {
        textError.textContent = "";
        return;
      }
      try {
        new AddressBook().name = name.value;
        textError.textContent = "";
      } catch (e) {
        textError.textContent = e;
      }
    });

    const tel = document.querySelector('#phoneNumber');
    const tel_error = document.querySelector('.tel-error');
    tel.addEventListener('input', function() {
        if (tel.value.length == 0) {
            tel_error.textContent = "";
            return;
        }
        try {
            new AddressBook().phoneNumber = phoneNumber.value;
            tel_error.textContent = "";
        } catch (e) {
            tel_error.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zip_error = document.querySelector('.zip-error');
    zip.addEventListener('input', function() {
        if (zip.value.length == 0) {
            zip_error.textContent = "";
            return;
        }
        try {
            new AddressBook().zipCode = zip.value;
            zip_error.textContent = "";
        } catch (e) {
            zip_error.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const address_error = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            address_error.textContent = "";
            return;
        }
        try {
            new AddressBook().address = address.value;
            address_error.textContent = "";
        } catch (e) {
            address_error.textContent = e;
        }
    });

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        console.log(contactObj);
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (error) {
        return;
    }
}

const setContactObject = () => {
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
        let contactData = contactList.find((contact) => contact._id == contactObj._id);
        console.log("contactData: " + contactData);
        if (!contactData){
            contactList.push(createContactData());
        } else {
            const index = contactList
                    .map((contact) => contact._id)
                    .indexOf(contactData._id);
            contactList.splice(index, 1, createContactData(contactData._id));
        }
    } else {
        contactList =  [createContact()]
    }
    alert(contactList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(contactList));
}

const createContactData = (id) => {
    let contactData = new AddressBook();
    if(!id)
        contactData.id = createNewContactId();
    else
        contactData.id = id;
    setContactData(contactData);
    return contactData;
}

const setContactData = (contactData) => {
    try {
        contactData.name = contactObj._name;
    } catch (error) {
        setTextValue('.name-error', error);
        throw error;
    }
    try {
        contactData.phoneNumber = contactObj._phoneNumber;
    } catch (error) {
        setTextValue('.tel-error', error);
        throw error;
    }
    try {
        contactData.address = contactObj._address;
    } catch (error) {
        setTextValue('.address-error', error);
        throw error;
    }
    contactData.city = contactObj._city;
    contactData.state = contactObj._state;
    contactData.zipCode = contactObj._zipCode;
    alert(contactData.toString());
}

const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactId");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactId", contactId);
    console.log(contactId);
    return contactId;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#address', '');
    setValue('#phoneNumber', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
    setTextValue('.tel-error', '');
    setTextValue('.name-error', '');
    setTextValue('.zip-error', '');
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