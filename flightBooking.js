class FlightBookingModel {
  constructor(input) {
    if (!input) {
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
    this.First_name = input.First_name || "";
    this.Last_name = input.Last_name || "";
    this.PNR = input.PNR || "";
    this.Fare_class = input.Fare_class || "";
    this.Travel_date = input.Travel_date || "";
    this.Pax = input.Pax || "";
    this.Ticketing_date = input.Ticketing.date || "";
    this.Email = input.Email || "";
    this.Mobile_phone = input.Mobile_phone || "";
    this.Booked_cabin = input.Booked_cabin || "";
  }
}
