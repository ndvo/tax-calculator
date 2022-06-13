import { itemParser } from '../main.js'
import { addCategorization, category } from '../categorization.js'
import { salesTaxValue } from '../tax.js'

mocha.setup("bdd")

const expect = chai.expect

describe('Parsing', function() {
  it('Should be able to parse simple products', function() {
    const test_cases = {
      '2 book at 12.49': [2, 'book', 12.49, false],
      '1 music CD at 14.99': [1, 'music CD', 14.99, false],
      '1 chocolate bar at 0.85': [1, 'chocolate bar', 0.85, false],
      '1 imported box of chocolates at 10.00': [
        1, 'imported box of chocolates', 10.00, true
      ],
      '1 imported bottle of perfume at 47.50': [
        1,'imported bottle of perfume', 47.50, true
      ],
      '1 imported bottle of perfume at 27.99': [
        1,'imported bottle of perfume', 27.99, true
      ],
      '1 bottle of perfume at 18.99': [
        1,'bottle of perfume', 18.99, false
      ],
      '1 packet of headache pills at 9.75': [
        1,'packet of headache pills', 9.75, false
      ],
      '3 imported boxes of chocolates at 11.25': [
        3,'imported boxes of chocolates', 11.25, true
      ],
    }
    for (let [k, v] of Object.entries(test_cases)) {
      const item = itemParser(k)
      expect(item.product.name).to.equal(v[1])
      expect(item.product.price).to.equal(v[2])
      expect(item.product.imported).to.equal(v[3])
      expect(item.quantity).to.equal(v[0])
    }
  })
})


describe('Categorization', function() {

  after(function() {
    releaseConsole()
  })

  it('Should be able to store valid categories', function() {
    const fakeConsole = captureConsole()
    addCategorization(['wrong'])
    addCategorization([{product: "tv", category: "medical"}])
    expect(fakeConsole.errorCalls.length).to.equal(1)
    expect(fakeConsole.errorCalls[0])
      .to.equal('Error adding categories: wrong')
  })

  it('Should be able to categorize products based on full names', function() {
    const categorization = [
      {product: 'headache pills', category: 'medical', result: 'medical'},
      {product: 'box of chocolates', category: 'food', result: 'food'},
      {product: 'imported box of chocolates', result: 'food'},
      {product: 'music CD', category: 'some other stuff'},
      {product: 'book', category: 'book', result: 'book'},
    ]
    addCategorization(categorization)
    for (let i of categorization) {
      const product = {name: i.product}
      expect(category(product)).to.equal(i.result)
    }

  })

})

describe('Tax rates', function() {

  it("should compute the tax given the value and rate", function() {
    const testCases = [
      [100, 10, 10],
      [555, 10, 55.5],
      [7, 3.53, 0.25],
      [6, 2.8, 0.20]
    ]
    for (let i of testCases) {
      expect(salesTaxValue(i[0], i[1])).to.equal(i[2])
    }
  })
})


const realConsole = {
  error: console.error,
  log: console.log
}

function captureConsole() {
  const fakeConsole = {
    logCalls: [],
    errorCalls: []
  }
  console.error = function(args) {
    fakeConsole.errorCalls.push(args)
  }
  console.log = function(args) {
    fakeConsole.logCalls.push(args)
  }
  return fakeConsole
}

function releaseConsole() {
  console.log = realConsole.log
  console.error = realConsole.error
}

mocha.run()
