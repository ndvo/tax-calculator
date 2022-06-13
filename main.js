/**
  * Basic types
  *
  * @typedef {Object} Product
  * @property {string} name - The user facing name of the product
  * @property {number} price - The product price. It must be an integer
  * @property {boolean} imported - Indicate whether the product is imported
  * @property {string} [category] - the category of this product
  *
  *
  * @typedef {Object} Tax
  * @property {string} name - The user facing name of the tax
  * @property {string|Array.<string>} condition - one or more attributes a
  * product must have to be subject to this tax.
  * @property {number} rate - the percentage rate to be applied. It can be a
  * floating point number: 100 is understood as 100%
  *
  * @typedef {Object} ReceiptItem
  * @property {Product} product - the purchased product
  * @property {number} quantity - the quantity purchased
  * @property {number} [totalTaxes] - the computed total tax for the item
  * @property {number} [totalPlusTaxes] - the computed total for the item
  */

/**
  * Parses a receipt input string and builds a ReceiptItem
  *
  * Assumes the input string to have the following structure:
  * - an integer representing the quantity
  * - the name of the product, potentially preceded by the word 'imported'
  *   which denotes the product is imported
  * - a floating point number representing the price, always preceded by 'at'
  * 
  * @param {string} input - the string description of a product
  * @return {ReceiptItem|undefined} - receipt item properly constructed
  */
export function itemParser(input) {
  const re = new RegExp(
    /* any number of digits */
    '\\s*(?<amount>\\d+)' +
    /* any words, start and ends with a letter, maybe preceded by 'imported '*/
    /* note that imported is both part of the name and the imported group */
    '\\s+(?<name>(?<imported>imported )?\\s*\\w[\\w ]*\\w)' +
    /* a floating point number preceded by 'at' */
    '\\s*at\\s*(?<price>\\d+\\.?\\d*)'
  )
  const match = input.match(re) 
  if (match) {
    return {
      product: {
        name: match.groups.name,
        imported: !!match.groups.imported,
        price: parseFloat(match.groups.price)
      },
      quantity: parseInt(match.groups.amount)
    }
  }
}

/**
  * Parses a multi line input
  *
  * @param {string} input - the complete multiline input
  * @return {Array.<ReceiptItem>} a potentially empty array of ReceiptItem
  */
export function multilineParser(input) {
  const splitted = input.split(/\r?\n/)
  return splitted.map(itemParser).filter(i => !!i)
}

const UI = {
  form: document.querySelector('#receipt-data'),
  output: document.querySelector('#raw-output')
}

const Receipt = {
  rawData: null,
  parsedData: null,
  output: null
}
function setupUI(ui, receipt) {
  ui.form.reset()
  ui.form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(ui.form)
    receipt.rawData = formData.get('purchased-items')
    receipt.parsedData = multilineParser(receipt.rawData)
    console.log(ui.output, receipt)
  })
}

setupUI(UI, Receipt)
