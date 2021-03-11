import { format } from '../../src/utils/string'

describe('Check formatting', () => {
  test('single replacement', () => {
    expect(format('HELLO {0}', 'WORLD')).toBe('HELLO WORLD')
  })

  test('many replacements', () => {
    expect(format('HELLO {0}. {1} Day', 'WORLD', 'Good')).toBe('HELLO WORLD. Good Day')
  })

  test('no replacements with no parameters', () => {
    expect(format('HELLO')).toBe('HELLO')
  })

  test('no replacements with parameters', () => {
    expect(format('HELLO', 'WORLD')).toBe('HELLO')
  })

  test('duplicate replacements', () => {
    expect(format('HELLO {0} {0}. Good {1}', 'WORLD', 'Day')).toBe('HELLO WORLD WORLD. Good Day')
  })

  test('too many arguments', () => {
    expect(format('HELLO {0}', 'WORLD', 'Day')).toBe('HELLO WORLD')
  })

  test('too few arguments', () => {
    expect(format('HELLO {0} {1}', 'WORLD')).toBe('HELLO WORLD {1}')
  })
})
