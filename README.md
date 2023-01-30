# flight-ticket-upgrader

## Problem Statement

A major airline wants to send an email, offering a discount on upgrade to a
higher class, to all the passengers who have booked tickets on its flights. For
this, the data will be received in a file at a particular time. The program
needs to read this data, perform some validations and then write it to a
different file. The records that fail the validation, need to be put into a
different file so that someone can look at them and fix the problem. Each
failing record should have an additional field that will contain the reason(s)
for the validation failure. Apart from the validation, we need to add a new
column called discount code to the processed records file whose value will be
calculated based on the fare class field in the input record. Fare class A - E
will have discount code OFFER_20, F - K will have discount code OFFER_30, L - R
will have OFFER_25; rest will have no offer code

**Input data will contain the following fields:**

- First name
- Last name
- PNR
- Fare class (Single character A - Z only)
- Travel date
- Pax (no of passengers)
- Ticketing date (the date of booking)
- Email
- Mobile phone
- Booked cabin (Economy, Premium Economy, Business, First)

**Validations:**

- Email ID is valid
- The mobile phone is valid
- Ticketing date is before travel date
- PNR is 6 character and Is alphanumeric
- The boked cabin is valid (one of Economy, Premium Economy, Business, First)

**Sample data:** For example, load data from a CSV file. **Input data:**
First_name, Last_name, PNR, Fare_class, Travel_date, Pax, Ticketing_date, Email,
Mobile_p hone, Booked_cabin A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0
1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 2 1 , abhishek@zzz.com, 9876543210,
Economy Monin, Sankar, PQ234, C, 2019-08-30, 2, 2019-05-22, monin@zzz.com,
9876543211, Economy Radhika, Suresh, ZZZ345, T, 2019-05-31, 4, 2019-05-21,
radhika@zzz, 9876543212, Business Kalyani, Ben, A1B2C3, M, 2019-04-30, 1,
2019-05-21, kben@zzz.com, 9876543213, Premium Economy Somnath, Batra, X1Y2Z4, Z,
2019-07-25, 3, 2019-05-23, sbatra@zzz.com, 9876543214, Economy

**Expected output:** Successfully processed records: First_name, Last_name, PNR,
Fare_class, Travel_date, Pax, Ticketing_date, Email, Mobile_p hone,
Booked_cabin, Discount_code Abhishek, Kumar, ABC123, F, 2019-07-31, 2,
2019-05-21, abhishek@zzz.com, 9876543210, Economy, OFFER_30 Kalyani, Ben,
A1B2C3, M, 2019-06-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy,
OFFER_25 Somnath, Batra, X1Y2Z4, Z, 2019-07-25, 3, 2019-05-23, sbatra@zzz.com,
9876543214, Economy,

**Failed records:**
First_name,Last_name,PNR,Fare_class,Travel_date,Pax,Ticketing_date,Email,Mobile_p
hone,Booked_cabin,Error Monin, Sankar, PQ234, C, 2019-08-30, 2, 2019-05-22,
monin@zzz.com, 9876543211, Economy, PNR invalid Radhika, Suresh, ZZZ345, T,
2019-05-31, 4, 2019-05-21, radhika@zzz, 9876543212, Business, Email invalid

## Solution

This is my solution. Please clone the repository to try it.

### How to try the solution?

```bash
git clone git@github.com:AlexErdei73/flight-ticket-upgrader.git
cd flight-ticket-upgrader
npm install
node main.js
```

### Applied technology

The solution is a basic solution in JavaScript language in the Node.js runtime.
I used the validator.js library for validation. I kept everything bear minimum,
but followed the restrictions given to the problem. If it would not be a
practice problem, I cerainly would have used MongoDB to store the data or at
least json file format. These are great matches with JavaScript. The
requirements mention CSV files, so I made my solution with this file format. The
other requirement was that the paradigm should be OOP. I created OOP solution,
but it is just a simple OOP solution. It would have been more practical using
TypeScript, so I could have used more sophisticated OOP tools and static types.
I have not used TypeScript for a while, so I thought not to waste your time with
that, this way it was faster for me. I used ES6 classes as JavaScript OOP
syntax, which may remind you a bit of a TypeScript solution, but there are
things missing here from the toolkit. In JS there are no access modifiers, with
ES6 classes, like in TypeScript for example. JavaScript is also a weakly typed
language, which can cause problems for beginners, who go against common sense. I
tried not to do that, so I hopefully managed to give you a robust solution,
which works exactly as you required. Please check it.

### What about large amount of data

I tried to keep the solution as simple as possible (KISS). This solution is not
for large amount of data. It uses basic file handling in Node.js, to keep it
simple. This is not the best for large files. If we had large files, we should
use streames, so we can keep free the operative memory from the large amount of
data. This solution can be used for significant amount of data, but the
available operational memory is a restriction here. I mention this because I
know that you deal with systems with large amount of data, so from your point of
view it is very important. I am fully aware of the differences. There is a great
library for CSV files in the Node ecosystem, which I could have used. I have
never used it yet, so I did not want to do it first time in a code challenge. It
could have slowed me down. In a real life problem, I would choose some other
way, if it was crucial for the problem.

### How about testing

Again for keep things simple, I have not made this solution with TDD. Although I
really like the testing first approach for building code, it would have slowed
me down a bit. I include the automated unit tests for the data model.
