const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(!nameRegex.test(name)) 
            throw 'Name is incorrect';
}

const checkPhoneNumber = (phoneNumber) => {
    let phoneRegex = RegExp('^([+]?[1-9][0-9])?[0-9]{10}$');
        if(!phoneRegex.test(phoneNumber)) 
            throw 'Phone Number is incorrect';
}

const checkZip = (zip) => {
    let zipRegex = RegExp('^[0-9]{3}\\s{0,1}[0-9]{3}$');
        if(!zipRegex.test(zip)) 
            throw 'Zip code is incorrect';
}

const checkAddress = (address) => {
    let addressRegex = RegExp('([a-zA-Z]{3,}\\s?){2,}$');
        if(!addressRegex.test(address)) 
            throw 'Address is incorrect';
}
