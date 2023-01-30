const flightBookingData = require("./flightBooking");
const fs = require("fs");
const path = require("path");

class Main {
  constructor() {
    this._inputLines = [];
    this._outputLines = [];
    this._failedLines = [];
  }

  _readInput(fileName, callback) {
    const inputFilePath = path.join(__dirname, fileName);
    fs.readFile(inputFilePath, (err, data) => {
      if (err) {
        return callback(err);
      }
      data
        .toString("utf-8")
        .split("\n")
        .forEach((line) => this._inputLines.push(line));
      callback(null);
    });
  }

  exec(callback) {
    this._readInput("input.csv", (err) => {
      if (err) {
        return callback(err);
      }
      this._inputLines.forEach((line, index) => {
        if (index === 0) return; //Skip first line
        const nextLine = flightBookingData
          .parse(line)
          .validate()
          .addDiscountCode()
          .stringify();
        if (flightBookingData.isValid()) this._outputLines.push(nextLine);
        else this._failedLines.push(nextLine);
      });
      callback(null);
    });
  }
}

const main = new Main();
main.exec((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("success: ", main._outputLines);
  console.log("failed:  ", main._failedLines);
});
