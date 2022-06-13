import { computeTax } from '/tax.js'
import { multilineParser } from '/parser.js'

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
  * Creates the output for a receipt item
  *
  * @param {ReceiptItem} item - to construct the output for
  * @return {string} the output for the item
  */
export function outputReceiptItem(item) {
  return `${item.quantity} ${item.product.name}: ${item.totalPlusTaxes.toFixed(2)}`
}

/**
  * Creates the output for a full receipt
  *
  * @param {Array.<ReceiptItem>} receipt - the receipt item to build the output
  */
export function outputReceipt(receipt) {
  return `
    ${receipt.map(outputReceiptItem).join('<br/>')}
    <br/>
    Sales Taxes: ${receipt.reduce((t, c) => t + c.totalTaxes, 0).toFixed(2)}
    <br/>
    Total: ${receipt.reduce((t, c) => t + c.totalPlusTaxes, 0).toFixed(2)}`
}

/**
  * Changes the Receipt in place adding the total with taxes
  *
  * @param {Array.<ReceiptItem>} receipt - the receipt to compute tax for
  */
export function applyTaxes(receipt) {
  for (let i of receipt) {
    const itemTax = computeTax(i)
    i.totalTaxes = i.quantity * itemTax
    i.totalPlusTaxes = (i.quantity * (i.product.price + itemTax))
  }

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
    applyTaxes(receipt.parsedData)
    receipt.output = outputReceipt(receipt.parsedData)
    ui.output.innerHTML = receipt.output
    console.log(ui.output, receipt)
  })
}

setupUI(UI, Receipt)
