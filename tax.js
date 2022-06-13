import { category } from '/categorization.js'


const exemptCategories = ['medical', 'book', 'food']

const basicSalesTax = 10

const importDuty = 5


/**
  * Computes the dollar value of a sales tax rate over some price
  *
  * It rounds decimals up to the nearest 0.05, according to the
  * rounding rules for sales tax.
  *
  * @param {number} price - the price for which we will compute the tax
  * @param {number} rate - the tax rate to be computed
  *
  * @return {number} the dollar value of the tax
  */
export function salesTaxValue(price, rate) {
  const appliedRate10 = price * rate / 10
  const appliedRateTruncated = Math.floor(appliedRate10)
  let decimals =  appliedRate10 - appliedRateTruncated
  decimals = (decimals == 0.00) ? 0 : (decimals <= 0.5) ? 0.5 : 1
  return (appliedRateTruncated + decimals)/10
}


/**
  * Computes the rate to be applied to a product
  *
  * Assumptions: 
  * - rounding rules are the same for sales tax and import duty.
  * - rounding is performed on the total tax due, not on each part.
  *
  * @param {ReceiptItem} product - to compute the taxt for
  */
export function taxRate(item) {
  const productCategory = category(item.product)
  const baseTaxRate = exemptCategories.includes(productCategory) ?
    0 : basicSalesTax
  const importDutyRate = item.product.imported ? 5 : 0
  return importDutyRate + baseTaxRate
}

export function computeTax(item) {
  return salesTaxValue(item.product.price, taxRate(item))
}
