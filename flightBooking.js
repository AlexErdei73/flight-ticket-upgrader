const validator = require("validator");

class FlightBookingModel {
  _KEYS = [
    "First_name",
    "Last_name",
    "PNR",
    "Fare_class",
    "Travel_date",
    "Pax",
    "Ticketing_date",
    "Email",
    "Mobile_phone",
    "Booked_cabin",
  ];

  _ERROR_MESSAGES = {
    Email: "Email invalid",
    Mobile_phone: "Mobile phone invalid",
    Ticketing_date: "Ticketing date is not before travel date",
    PNR: "PNR should be 6 alphanumeric characters",
    Booked_cabin: "Booked cabin invalid",
  };

  _VALIDATOR_FNS = {
    Email: (value) => validator.isEmail(value),
    Mobile_phone: (value) => validator.isMobilePhone(value),
    Ticketing_date: (ticketingDateIsoStr) =>
      validator.isBefore(ticketingDateIsoStr, this.Travel_date),
    PNR: (value) =>
      validator.isLength(value, { min: 6, max: 6 }) &&
      validator.isAlphanumeric(value),
    Booked_cabin: (value) =>
      ["Economy", "Premium Economy", "Business", "First"].indexOf(value) !== -1,
  };

  constructor(input) {
    if (!input) {
      //Add empty strings to string fields for new instances without input to escape error
      input = {};
      this._KEYS.forEach((key) => {
        input[key] = "";
      });
    }
    // Initialize the string fields from input if fields exist otherwise empty strings
    this._KEYS.forEach((key) => {
      this[key] = input[key] || "";
    });
    this.validationErrors = ["Content has not been validated"]; //Add the field for storing validation errors
    this._removeSpaces();
  }

  _removeSpaces() {
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      if (key === "validationErrors") return; //Skip validationErrors field
      this[key] = validator.blacklist(value, " ");
      if (this[key] === "PremiumEconomy") this[key] = "Premium Economy"; //Put back space between Premium and Economy
    });
  }

  validate() {
    this.validationErrors = []; //Remove error messages
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      if (!this._VALIDATOR_FNS[key]) return; //Skip fields which do not require validation
      if (!this._VALIDATOR_FNS[key](value))
        this.validationErrors.push(this._ERROR_MESSAGES[key]);
    });
    return this;
  }

  isValid() {
    return this.validationErrors.length === 0;
  }

  log() {
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      console.log(key, value);
    });
    return this;
  }

  stringify() {
    const output = [];
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      if (key === "validationErrors") {
        //Handle this separately for better readibility
        output.push(value.join(", "));
        return;
      }
      output.push(value);
    });
    return output.join(", ");
  }

  parse(line) {
    const input = line.split(",");
    this._KEYS.forEach((key, index) => {
      this[key] = input[index];
    });
    this._removeSpaces();
    return this;
  }
}

const flightBooking = new FlightBookingModel();
console.log(flightBooking.isValid());
flightBooking
  .parse(
    "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 2 1 , abhishek@zzz.com, 9876543210, Economy"
  )
  .validate()
  .log();
console.log(flightBooking.stringify());
console.log(flightBooking.isValid());
