const Deprecator = require('../index')

describe('Deprecator', () => {
  let rip
  let spy = jest.spyOn(global.console, 'warn')

  beforeEach(() => {
    rip = new Deprecator()
  })

  afterEach(() => {
    spy.mockReset()
  })

  describe('default', () => {
    test('should return an object with a print method', () => {
      expect(rip.print).toBeTruthy()
      expect(typeof rip.print).toBe('function')
    })
  })

  describe('print', () => {
    test('should console.warn with message by default', () => {
      const spy = jest.spyOn(global.console, 'warn')
      const message = 'Deprecated!'
      rip.print(message)

      expect(spy).toHaveBeenCalledWith(message)
    })
  })
})
