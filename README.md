# Receipt

This application will create a simple receipt from a set of purchased items.

Items must be provided as pure text with the following format:

`{number of items} {optional 'imported'} {name of the item} at {price}`

Examples:
- 1 music CD at 14.99
- 3 oranges at 0.50

Output will be rendered when the form is submitted and will present:
- The items purchased
- Prices with taxes multiplied by the quantity
- Total taxes
- Total cost

## Running the application

Start a small server in the root folder of the application and visit the appropriate URL.

`ruby -run -e httpd . -p 5000`

Then visit http://localhost:5000

## Runnig the tests

Visit http://localhost:5000/tests
