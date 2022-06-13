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
