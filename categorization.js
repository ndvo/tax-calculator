
/** categorization config **/
const localDb = 'productCategoryDb'
const availableCategories = ['medical', 'book', 'food']

/**
  * The categories are stored in local storage for now.
  * 
  * This allow us to have it decoupled enough to change it fetch data from the
  * server at some point instead of having everything on the client side.
  */
let productCategoryDb = {
  'book': 'book',
  'music CD': undefined,
  'chocolate bar': 'food',
  'box of chocolates': 'food',
  'boxes of chocolates': 'food',
  'bottle of perfume': undefined,
  'packet of headache pills': 'medical',
}
function loadProductCategoryDb() {
  productCategoryDb = JSON.parse(localStorage.getItem(localDb))
}

/**
  * @typedef {Object} ProductCategory
  * @property {string} product - The product full name
  * @property {string} category - The category the product should be in
  */

/**
  * Adds new categories to the categorization database
  *
  * @param {Array.<ProductCategory>} categorizations to be added to the db
  */
export function addCategorization(categorizations) {
  const valid = i => i.product && availableCategories.includes(i.category)
  const errors = categorizations.filter(i => !valid(i))
  if (errors.length) {
    console.error(`Error adding categories: ${errors}`)
  }
   
  productCategoryDb = 
    JSON.parse(localStorage.getItem(localDb)) 
    || productCategoryDb
  for (let i of categorizations.filter(valid)) {
      productCategoryDb[sanitizeProductName(i.product)] = i.category
  }
  localStorage.setItem(localDb, JSON.stringify(productCategoryDb))
}

/**
  * Adds a category field based to the object based on the name.
  *
  * @param {Object} product - the product to be categorized
  * @param {string} product.name - the name of the product
  * @return {string} - the product category
  */
export function category(product) {
  return productCategoryDb[sanitizeProductName(product.name)]
}

/**
  * Strips the product name of prefixes and 
  *
  * @param {string} name - product name for which to return a category
  */
function sanitizeProductName(name) {
  // TODO: use singularize or an NLP tool to avoid repeating entries in the
  // category DB.
  // - Identify the word to be singularized:
  //   ([boxes] of candies/candies [boxes])
  return name.replace(/^\s+|\s+$/, '').replace(/^imported /, '')
}

