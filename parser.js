
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

