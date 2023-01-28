# flight-ticket-upgrader

## Problem Statement

A major airline wants to send an email, offering a discount on upgrade to a higher class, to all
the passengers who have booked tickets on its flights. For this, the data will be received in a file
at a particular time.
The program needs to read this data, perform some validations and then write it to a different
file. The records that fail the validation, need to be put into a different file so that someone can
look at them and fix the problem. Each failing record should have an additional field that will
contain the reason(s) for the validation failure.
Apart from the validation, we need to add a new column called discount code to the processed
records file whose value will be calculated based on the fare class field in the input record. Fare
class A - E will have discount code OFFER_20, F - K will have discount code OFFER_30, L - R
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

**Sample data:** For example, load data from a CSV file.
**Input data:**
First_name, Last_name, PNR, Fare_class, Travel_date, Pax, Ticketing_date, Email, Mobile_p
hone, Booked_cabin
A b h i s h e k , K u m a r , A B C 1 2 3 , F , 2 0 1 9 - 0 7 - 3 1 , 2 , 2 0 1 9 - 0 5 - 2 1 ,
abhishek@zzz.com, 9876543210, Economy
Monin, Sankar, PQ234, C, 2019-08-30, 2, 2019-05-22, monin@zzz.com,
9876543211, Economy Radhika, Suresh, ZZZ345, T, 2019-05-31, 4,
2019-05-21, radhika@zzz, 9876543212, Business Kalyani, Ben, A1B2C3, M,
2019-04-30, 1, 2019-05-21, kben@zzz.com, 9876543213, Premium Economy
Somnath, Batra, X1Y2Z4, Z, 2019-07-25, 3, 2019-05-23, sbatra@zzz.com,
9876543214, Economy

**Expected output:** Successfully processed records:
First_name, Last_name, PNR, Fare_class, Travel_date, Pax, Ticketing_date, Email, Mobile_p
hone, Booked_cabin, Discount_code
Abhishek, Kumar, ABC123, F, 2019-07-31, 2, 2019-05-21,
abhishek@zzz.com, 9876543210, Economy, OFFER_30
Kalyani, Ben, A1B2C3, M, 2019-06-30, 1, 2019-05-21, kben@zzz.com,
9876543213, Premium Economy, OFFER_25
Somnath, Batra, X1Y2Z4, Z, 2019-07-25, 3, 2019-05-23, sbatra@zzz.com,
9876543214, Economy,

**Failed records:**
First_name,Last_name,PNR,Fare_class,Travel_date,Pax,Ticketing_date,Email,Mobile_p
hone,Booked_cabin,Error
Monin, Sankar, PQ234, C, 2019-08-30, 2, 2019-05-22, monin@zzz.com,
9876543211, Economy, PNR invalid
Radhika, Suresh, ZZZ345, T, 2019-05-31, 4, 2019-05-21, radhika@zzz,
9876543212, Business, Email invalid
