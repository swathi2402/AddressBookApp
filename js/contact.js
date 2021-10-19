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
});

const save = () => {
    try {
        let contactData = createContact();
        createAndUpdateStorage(contactData);
    } catch (error) {
        return;
    }
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
    } catch (error) {
        setTextValue('.tel-error', error);
        throw error;
    }
    try {
        contactData.address = getInputValueById("#address");
        contactData.city = getInputValueById("#city");
        contactData.state = getInputValueById("#state");
        contactData.zipCode = getInputValueById("#zip");
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

function createAndUpdateStorage(contactData) {
    let contactList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(contactList != undefined) {
        contactList.push(contactData);
    } else {
        contactList =  [contactData]
    }
    localStorage.setItem("AddressBookList", JSON.stringify(contactList));
}
