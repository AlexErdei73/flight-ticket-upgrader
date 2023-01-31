const flightBookingData = require("./flightBooking");

const inputLineWithoutFault =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 2 1 , abhishek@zzz.com, 9876543210, Economy";
const expectedOutputLine =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-21, abhishek@zzz.com, 9876543210, Economy";

test("A perfect input line transformed to the expected output line", () => {
  expect(flightBookingData.parse(inputLineWithoutFault).stringify()).toBe(
    expectedOutputLine
  );
});

test("A perfect input line without validation makes the isValid method false", () => {
  expect(flightBookingData.parse(inputLineWithoutFault).isValid()).toBe(false);
});

//Testing validation
test("A perfect line with validation transforms to expected output line", () => {
  expect(
    flightBookingData.parse(inputLineWithoutFault).validate().stringify()
  ).toBe(expectedOutputLine);
});

test("A perfect line with validation makes isValid method true", () => {
  expect(
    flightBookingData.parse(inputLineWithoutFault).validate().isValid()
  ).toBe(true);
});

const inputLineWithPNRFault =
  "A b h i s h e k , K u m a r , A B - 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 2 1 , abhishek@zzz.com, 9876543210, Economy";
const expectedOutputWithPNRFault =
  "Abhishek, Kumar, AB-123, F, 2019-07-31, 2, 2019-05-21, abhishek@zzz.com, 9876543210, Economy, PNR should be 6 alphanumeric characters";

test("A faulty line transforms to the expected output with validation in the case of invalid PNR", () => {
  expect(
    flightBookingData.parse(inputLineWithPNRFault).validate().stringify()
  ).toBe(expectedOutputWithPNRFault);
});

test("A faulty line with validation makes isValid method false in the case of invalid PNR", () => {
  expect(
    flightBookingData.parse(inputLineWithPNRFault).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidDate1 =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 8 - 0 1 , abhishek@zzz.com, 9876543210, Economy";
const expectedOutputWithInvalidDate1 =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-08-01, abhishek@zzz.com, 9876543210, Economy, Ticketing date is not before travel date";

test("A faulty line transforms to the expected output with validation in the case of invalid Date", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidDate1).validate().stringify()
  ).toBe(expectedOutputWithInvalidDate1);
});

test("A faulty line with validation makes isValid method false in the case of invalid Date", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidDate1).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidDate2 =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 0 5 - 3 1 , abhishek@zzz.com, 9876543210, Economy";
const expectedOutputWithInvalidDate2 =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 201905-31, abhishek@zzz.com, 9876543210, Economy, Ticketing date is not before travel date";

test("A faulty line transforms to the expected output with validation in the case of invalid Date", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidDate2).validate().stringify()
  ).toBe(expectedOutputWithInvalidDate2);
});

test("A faulty line with validation makes isValid method false in the case of invalid Date", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidDate2).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidDate3 =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 4 1 , 2 , 2 0 1 9 - 0 5 - 3 1 , abhishek@zzz.com, 9876543210, Economy";
const expectedOutputWithInvalidDate3 =
  "Abhishek, Kumar, ABC123, F, 2019-07-41, 2, 2019-05-31, abhishek@zzz.com, 9876543210, Economy, Ticketing date is not before travel date";

test("A faulty line transforms to the expected output with validation in the case of invalid Date", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidDate3).validate().stringify()
  ).toBe(expectedOutputWithInvalidDate3);
});

test("A faulty line with validation makes isValid method false in the case of invalid Date", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidDate3).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidEmail =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 3 1 , abhishek@zzzcom, 9876543210, Economy";
const expectedOutputWithInvalidEmail =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-31, abhishek@zzzcom, 9876543210, Economy, Email invalid";

test("A faulty line transforms to the expected output with validation in the case of invalid Email", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidEmail).validate().stringify()
  ).toBe(expectedOutputWithInvalidEmail);
});

test("A faulty line with validation makes isValid method false in the case of invalid Email", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidEmail).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidMobile =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 3 1 , abhishek@zzz.com, 98765432101234, Economy";
const expectedOutputWithInvalidMobile =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-31, abhishek@zzz.com, 98765432101234, Economy, Mobile phone invalid";

test("A faulty line transforms to the expected output with validation in the case of invalid Mobile", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidMobile).validate().stringify()
  ).toBe(expectedOutputWithInvalidMobile);
});

test("A faulty line with validation makes isValid method false in the case of invalid Mobile", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidMobile).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidCabin =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 3 1 , abhishek@zzz.com, 9876543210, Eco_nomy";
const expectedOutputWithInvalidCabin =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-31, abhishek@zzz.com, 9876543210, Eco_nomy, Booked cabin invalid";

test("A faulty line transforms to the expected output with validation in the case of invalid Cabin", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidCabin).validate().stringify()
  ).toBe(expectedOutputWithInvalidCabin);
});

test("A faulty line with validation makes isValid method false in the case of invalid Cabin", () => {
  expect(
    flightBookingData.parse(inputLineWithInvalidCabin).validate().isValid()
  ).toBe(false);
});

const inputLineWithInvalidEmailandCabin =
  "A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 3 1 , abhishek@zzzcom, 9876543210, Eco_nomy";
const expectedOutputWithInvalidEmailandCabin =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-31, abhishek@zzzcom, 9876543210, Eco_nomy, Email invalid, Booked cabin invalid";

test("A faulty line transforms to the expected output with validation in the case of invalid Email and Cabin", () => {
  expect(
    flightBookingData
      .parse(inputLineWithInvalidEmailandCabin)
      .validate()
      .stringify()
  ).toBe(expectedOutputWithInvalidEmailandCabin);
});

test("A faulty line with validation makes isValid method false in the case of invalid Email and Cabin", () => {
  expect(
    flightBookingData
      .parse(inputLineWithInvalidEmailandCabin)
      .validate()
      .isValid()
  ).toBe(false);
});

const secondPerfectInputLine =
  "Kalyani, Ben, A1B2C3, M, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy";

test("Parsing a second line after parsing and validating the first line should make isValid false", () => {
  expect(
    flightBookingData
      .parse(inputLineWithoutFault)
      .validate()
      .parse(secondPerfectInputLine)
      .isValid()
  ).toBe(false);
});

//Testing addDiscountCode
const expectedOutputLineWithDiscountCode =
  "Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-21, abhishek@zzz.com, 9876543210, Economy, OFFER_30";

test("A perfect input line transformed to the expected output line with the right disount code when addDiscountCode applied after validation", () => {
  expect(
    flightBookingData
      .parse(inputLineWithoutFault)
      .validate()
      .addDiscountCode()
      .stringify()
  ).toBe(expectedOutputLineWithDiscountCode);
});

const inputLineWithoutFault2 =
  "Kalyani, Ben, A1B2C3, M, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy";

const expectedOutputLineWithDiscountCode2 =
  "Kalyani, Ben, A1B2C3, M, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy, OFFER_25";

test("A perfect input line transformed to the expected output line with the right disount code when addDiscountCode applied after validation", () => {
  expect(
    flightBookingData
      .parse(inputLineWithoutFault2)
      .validate()
      .addDiscountCode()
      .stringify()
  ).toBe(expectedOutputLineWithDiscountCode2);
});

const inputLineWithoutFault3 =
  "Kalyani, Ben, A1B2C3, B, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy";
const expectedOutputLineWithDiscountCode3 =
  "Kalyani, Ben, A1B2C3, B, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy, OFFER_20";

test("A perfect input line transformed to the expected output line with the right disount code when addDiscountCode applied after validation", () => {
  expect(
    flightBookingData
      .parse(inputLineWithoutFault3)
      .validate()
      .addDiscountCode()
      .stringify()
  ).toBe(expectedOutputLineWithDiscountCode3);
});

const inputLineWithoutFault4 =
  "Kalyani, Ben, A1B2C3, S, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy";

const expectedOutputLineWithoutDiscountCode4 =
  "Kalyani, Ben, A1B2C3, S, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy";

test("A perfect input line transformed to the expected output line with no disount code when Fare class is after R in the alphabet", () => {
  expect(
    flightBookingData
      .parse(inputLineWithoutFault4)
      .validate()
      .addDiscountCode()
      .stringify()
  ).toBe(expectedOutputLineWithoutDiscountCode4);
});

//AddDiscountCode has no effect on faulty lines
test("A faulty line transforms to the expected output without discount code with validation before applying addDiscountCode in the case of invalid Email", () => {
  expect(
    flightBookingData
      .parse(inputLineWithInvalidEmail)
      .validate()
      .addDiscountCode()
      .stringify()
  ).toBe(expectedOutputWithInvalidEmail);
});

//Validation should be before applying addDiscountCode, otherwise addDiscountCode has no effect
test("A perfect input line transformed to the expected output line without the right disount code when addDiscountCode applied before validation", () => {
  expect(
    flightBookingData
      .parse(inputLineWithoutFault)
      .addDiscountCode()
      .validate()
      .stringify()
  ).toBe(expectedOutputLine);
});

test("A faulty line transforms to the expected output without discount code with validation after applying addDiscountCode in the case of invalid Email", () => {
  expect(
    flightBookingData
      .parse(inputLineWithInvalidEmail)
      .addDiscountCode()
      .validate()
      .stringify()
  ).toBe(expectedOutputWithInvalidEmail);
});
