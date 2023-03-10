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
    this._hasValidated = true;
    return this;
  }

  isValid() {
    return this._hasValidated && this.validationErrors.length === 0;
  }

  addDiscountCode() {
    this.Discount_code = "";
    if (!this.isValid()) return this; //Skip adding any discount code for invalid data
    if (/^[A-E]$/.test(this.Fare_class)) {
      this.Discount_code = "OFFER_20";
    }
    if (/^[F-K]$/.test(this.Fare_class)) {
      this.Discount_code = "OFFER_30";
    }
    if (/^[L-R]$/.test(this.Fare_class)) {
      this.Discount_code = "OFFER_25";
    }
    return this;
  }

  stringify() {
    const output = [];
    Object.entries(this).forEach(([key, value]) => {
      if (key[0] === "_") return; //Skip private fields
      if (key === "validationErrors") {
        if (!this.isValid() && this.validationErrors.length !== 0) {
          //Handle this separately for better readibility
          output.push(value.join(", "));
          return;
        } else return; //Skip validationErrors if data passed validation or no error message
      }
      //Skip Discount_code for invalid data or empty string value
      if (key === "Discount_code" && (!this.isValid() || value === "")) return;
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
    this._hasValidated = false;
    return this;
  }
}

module.exports = new FlightBookingModel();
