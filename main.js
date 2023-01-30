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

  _writeFile(fileName, array, callback) {
    const filePath = path.join(__dirname, fileName);
    fs.writeFile(filePath, array.join("\n"), (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }

  exec(callback) {
    this._readInput("input.csv", (err) => {
      if (err) {
        return callback(err);
      }
      this._inputLines.forEach((line, index) => {
        if (index === 0) {
          //Skip first line, but add it in extended form to _outputLines and _failedLines
          this._outputLines.push(line + ", Discount_code");
          this._failedLines.push(line + ", Error(s)");
          return;
        }
        const nextLine = flightBookingData
          .parse(line)
          .validate()
          .addDiscountCode()
          .stringify();
        if (flightBookingData.isValid()) this._outputLines.push(nextLine);
        else this._failedLines.push(nextLine);
      });
      this._writeFile("output.csv", this._outputLines, (err) => {
        if (err) {
          return callback(err);
        }
        this._writeFile("failed.csv", this._failedLines, (err) => {
          if (err) {
            return callback(err);
          }
          return callback(null);
        });
      });
    });
  }
}

const main = new Main();
main.exec((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(
    "The operation is successful. The successfully modified entries are in output.csv file. The failed entries are in failed.csv file."
  );
});
