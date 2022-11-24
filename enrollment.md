# Recording enrollment transaction

The enrollment captures, for a student, the classes for which they will be charged and then be registered to appear in class lists.

1. Get prices of the classes
2. Get discount for coupon codes
3. Calculate the total price
4. Add a "pending" student enrollment transaction to the database
5. Transact with Braintree
6. Add a "successful" student enrollment transaction to the database
7. Create a student record
8. Add student to the class

Then the user can be shown a success confirmation page and a printable receipt.
