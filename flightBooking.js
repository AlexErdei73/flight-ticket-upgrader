const validator = require("validator");

class FlightBookingModel {
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
    Booked_cabin: (value) => true, //TODO
  };

  constructor(input) {
    if (!input) {
      //Add empty strings to string fields for new instances without input to escape error
      input = {
        First_name: "",
        Last_name: "",
        PNR: "",
        Fare_class: "",
        Travel_date: "",
        Pax: "",
        Ticketing_date: "",
        Email: "",
        Mobile_phone: "",
        Booked_cabin: "",
      };
    }
    // Initialize the string fields from input if fields exist otherwise empty strings
    this.First_name = input.First_name || "";
    this.Last_name = input.Last_name || "";
    this.PNR = input.PNR || "";
    this.Fare_class = input.Fare_class || "";
    this.Travel_date = input.Travel_date || "";
    this.Pax = input.Pax || "";
    this.Ticketing_date = input.Ticketing_date || "";
    this.Email = input.Email || "";
    this.Mobile_phone = input.Mobile_phone || "";
    this.Booked_cabin = input.Booked_cabin || "";
    this.validationErrors = []; //Add the field for storing validation errors
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
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      if (!this._VALIDATOR_FNS[key]) return; //Skip fields which do not require validation
      if (!this._VALIDATOR_FNS[key](value))
        this.validationErrors.push(this._ERROR_MESSAGES[key]);
    });
  }

  log() {
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      console.log(key, value);
    });
  }
}

const flightBooking = new FlightBookingModel({
  First_name: "  B r u c e",
  Last_name: "W i l l i s",
  PNR: "R P N 1 2 3",
  Fare_class: "T",
  Travel_date: "2 0 2 3 - 1 1 - 0 9",
  Pax: "5",
  Ticketing_date: "2 0 2 2 - 1 1 - 0 9",
  Email: " b _ w i l l i s @ g m a i l . c o m ",
  Mobile_phone: " + 4 4 7 4 9 6 0 3 4 2 4 4 ",
  Booked_cabin: "Premium Economy",
});
flightBooking.validate();
flightBooking.log();
