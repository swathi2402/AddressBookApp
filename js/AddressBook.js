class AddressBook {
    id;

    get name() {
        return this._name; 
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(name)) 
            this._name = name;
        else 
            throw 'Name is incorrect';
    }

    get phoneNumber() {
        return this._phoneNumber; 
    }

    set phoneNumber(phoneNumber) {
        let phoneRegex = RegExp('^([+]?[1-9][0-9])?[0-9]{10}$');
        if(phoneRegex.test(phoneNumber)) 
            this._phoneNumber = phoneNumber;
        else 
            throw 'Phone number is incorrect';
    }

    get address() {
        return this._address; 
    }

    set address(address) {
        let addressRegex = RegExp('([a-zA-Z]{3,}\\s?){2,}$');
        if(addressRegex.test(address)) 
            this._address = address;
        else 
            throw 'Address is incorrect';
    }

    get city() {
        return this._city; 
    }

    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state; 
    }

    set state(state) {
        this._state = state;
    }

    get zipCode() {
        return this._zipCode; 
    }

    set zipCode(zipCode) {
        let zipRegex = RegExp('^[0-9]{3}\\s{0,1}[0-9]{3}$');
        if(zipRegex.test(zipCode)) 
            this._zipCode = zipCode;
        else 
            throw 'Zip code is incorrect';
    }

    toString() {
        return "id =" + this.id + ", name = " + this.name + ", phoneNumber = " + this.phoneNumber + ", address = " + this.address + ", city = " + this.city + 
               ", state = " + this.state + ", zipCode = " + this.zipCode;
    }
}