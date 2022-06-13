import { itemParser } from '../main.js'

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
mocha.run()
