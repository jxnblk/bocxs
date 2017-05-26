const test = require('ava')
const React = require('react')
const render = require('react-test-renderer').create
const {
  util,
  attr,
  sx,
  Box,
  Text,
  Flex,
  Input,
} = require('./src')

test('util.px converts numbers to pixel values', t => {
  const a = util.px('margin')(16)
  t.is(a, '16px')
})

test('util.t returns a boolean', t => {
  const a = util.t(0)
  const b = util.t('')
  const c = util.t(null)
  const d = util.t()
  t.is(a, true)
  t.is(b, true)
  t.is(c, false)
  t.is(d, false)
})

test('util.k returns first truthy prop value', t => {
  const a = util.k('width', 'w')({ width: 1, w: 2 })
  const b = util.k('width', 'w')({ w: 2 })
  t.is(a, 1)
  t.is(b, 2)
})

test('util.num checks for numbers', t => {
  const a = util.num(0)
  const b = util.num(NaN)
  const c = util.num('0')
  t.is(a, true)
  t.is(b, false)
  t.is(c, false)
})

test('util.wx returns widths', t => {
  const a = util.wx(0)
  const b = util.wx(1/2)
  const c = util.wx(1)
  const d = util.wx(32)
  const e = util.wx('auto')
  t.is(a, 0)
  t.is(b, '50%')
  t.is(c, '100%')
  t.is(d, 32)
  t.is(e, 'auto')
})

test('util.scale returns scalar values', t => {
  const a = util.scale(0)
  const b = util.scale(1)
  const c = util.scale(2)
  const d = util.scale(5)
  const e = util.scale('auto')
  t.is(a, 0)
  t.is(b, 8)
  t.is(c, 16)
  t.is(d, 5)
  t.is(e, 'auto')
})

test('util.neg returns true for negative numbers', t => {
  const a = util.neg(-1)
  const b = util.neg(0)
  const c = util.neg(1)
  const d = util.neg('2')
  t.is(a, true)
  t.is(b, false)
  t.is(c, false)
  t.is(d, false)
})

test('util.val returns value or null', t => {
  const a = util.val(2)
  const b = util.val()
  t.is(a, 2)
  t.is(b, null)
})

test('attr.width formats width', t => {
  const a = attr.width({ width: 1/2 })
  t.deepEqual(a, [ '50%' ])
})

test('attr.width handles array values', t => {
  const a = attr.width({
    width: [
      1, 1/2
    ]
  })
  t.true(Array.isArray(a))
  t.deepEqual(a, [
    '100%',
    '50%',
  ])
})

test('attr.width formats w', t => {
  const a = attr.width({ w: 1/4 })
  t.deepEqual(a, [ '25%' ])
})

test('attr.width supports string values', t => {
  const a = attr.width({ width: '40em' })
  t.deepEqual(a, [ '40em' ])
})

test('attr.width supports 0', t => {
  const a = attr.width({ width: 0 })
  t.deepEqual(a, [ 0 ])
})

test('attr.margin formats margin', t => {
  const a = attr.margin({ margin: 10 })
  const b = attr.margin({ margin: 2 })
  const c = attr.margin({ margin: -1 })
  t.deepEqual(a, [ '10px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ '-8px' ])
})

test('attr.margin formats m', t => {
  const a = attr.margin({ m: 10 })
  const b = attr.margin({ m: 2 })
  const c = attr.margin({ m: -1 })
  t.deepEqual(a, [ '10px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ '-8px' ])
})

test('attr.margin handles strings', t => {
  const a = attr.margin({ margin: 'auto' })
  const b = attr.margin({ m: 'auto' })
  t.deepEqual(a, [ 'auto' ])
  t.deepEqual(b, [ 'auto' ])
})

test('attr.marginTop formats margin', t => {
  const a = attr.marginTop({ marginTop: 2 })
  const b = attr.marginTop({ mt: 2 })
  const c = attr.marginTop({ marginTop: 'auto' })
  const d = attr.marginTop({ my: 2 })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ '16px' ])
})

test('attr.marginRight formats margin', t => {
  const a = attr.marginRight({ marginRight: 2 })
  const b = attr.marginRight({ mr: 2 })
  const c = attr.marginRight({ marginRight: 'auto' })
  const d = attr.marginRight({ mx: 'auto' })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ 'auto' ])
})

test('attr.marginBottom formats margin', t => {
  const a = attr.marginBottom({ marginBottom: 2 })
  const b = attr.marginBottom({ mb: 2 })
  const c = attr.marginBottom({ marginBottom: 'auto' })
  const d = attr.marginBottom({ my: 'auto' })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ 'auto' ])
})

test('attr.marginLeft formats margin', t => {
  const a = attr.marginLeft({ marginLeft: 2 })
  const b = attr.marginLeft({ ml: 2 })
  const c = attr.marginLeft({ marginLeft: 'auto' })
  const d = attr.marginLeft({ mx: 'auto' })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ 'auto' ])
})

test('attr.padding formats padding', t => {
  const a = attr.padding({ padding: 10 })
  const b = attr.padding({ padding: 2 })
  const c = attr.padding({ padding: -1 })
  t.deepEqual(a, [ '10px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ '-8px' ])
})

test('attr.padding formats p', t => {
  const a = attr.padding({ p: 10 })
  const b = attr.padding({ p: 2 })
  const c = attr.padding({ p: -1 })
  t.deepEqual(a, [ '10px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ '-8px' ])
})

test('attr.padding handles strings', t => {
  const a = attr.padding({ padding: 'auto' })
  const b = attr.padding({ p: 'auto' })
  t.deepEqual(a, [ 'auto' ])
  t.deepEqual(b, [ 'auto' ])
})

test('attr.paddingTop formats padding', t => {
  const a = attr.paddingTop({ paddingTop: 2 })
  const b = attr.paddingTop({ pt: 2 })
  const c = attr.paddingTop({ paddingTop: 'auto' })
  const d = attr.paddingTop({ py: 2 })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ '16px' ])
})

test('attr.paddingRight formats padding', t => {
  const a = attr.paddingRight({ paddingRight: 2 })
  const b = attr.paddingRight({ pr: 2 })
  const c = attr.paddingRight({ paddingRight: 'auto' })
  const d = attr.paddingRight({ px: 'auto' })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ 'auto' ])
})

test('attr.paddingBottom formats padding', t => {
  const a = attr.paddingBottom({ paddingBottom: 2 })
  const b = attr.paddingBottom({ pb: 2 })
  const c = attr.paddingBottom({ paddingBottom: 'auto' })
  const d = attr.paddingBottom({ py: 'auto' })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ 'auto' ])
})

test('attr.paddingLeft formats padding', t => {
  const a = attr.paddingLeft({ paddingLeft: 2 })
  const b = attr.paddingLeft({ pl: 2 })
  const c = attr.paddingLeft({ paddingLeft: 'auto' })
  const d = attr.paddingLeft({ px: 'auto' })
  t.deepEqual(a, [ '16px' ])
  t.deepEqual(b, [ '16px' ])
  t.deepEqual(c, [ 'auto' ])
  t.deepEqual(d, [ 'auto' ])
})

test('sx returns a declaration', t => {
  const a = sx('width')({ width: [ '16px' ] })
  t.is(typeof a, 'string')
  t.is(a, 'width:16px;')
})

test('sx handles array values', t => {
  const a = sx('width')({
    width: [
      '16px',
      '24px'
    ]
  })
  t.is(typeof a, 'string')
  t.is(a, 'width:16px;@media screen and (min-width:40em){width:24px;}')
})

// Snapshots
test('Box renders', t => {
  const a = render(<Box />).toJSON()
  const b = render(<Box m={1} />).toJSON()
  const c = render(<Box p={2} />).toJSON()
  const d = render(<Box w={1/2} />).toJSON()
  t.snapshot(a)
  t.snapshot(b)
  t.snapshot(c)
  t.snapshot(d)
})

test('Text renders', t => {
  const a = render(<Text />).toJSON()
  const b = render(<Text m={1} />).toJSON()
  const c = render(<Text p={2} />).toJSON()
  const d = render(<Text w={1/2} />).toJSON()
  t.snapshot(a)
  t.snapshot(b)
  t.snapshot(c)
  t.snapshot(d)
})

test('Flex renders', t => {
  const json = render(<Flex />).toJSON()
  t.snapshot(json)
})

test('Input renders', t => {
  const json = render(<Input />).toJSON()
  t.snapshot(json)
})

test('Box has StyleComponent methods', t => {
  t.is(typeof Box.extend, 'function')
  t.is(typeof Box.withComponent, 'function')
})

test('Box supports `is` prop', t => {
  const a = render(<Box is='a' />).toJSON()
  const li = render(<Box is='li' />).toJSON()
  const button = render(<Box is='button' />).toJSON()
  const h2 = render(<Box is='h2' />).toJSON()
  t.is(a.type, 'a')
  t.is(li.type, 'li')
  t.is(button.type, 'button')
  t.is(h2.type, 'h2')
})
