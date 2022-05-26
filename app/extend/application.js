const path = require('path')

const CHAIN = Symbol('yody.chain')

module.exports = {
  get chain() {
    this[CHAIN] = this[CHAIN] || this.yodyinfo.lib.Chain.get(this.config.yody.chain)
    return this[CHAIN]
  },
  get yodyinfo() {
    return {
      lib: require(path.resolve(this.config.yodyinfo.path, 'lib')),
      rpc: require(path.resolve(this.config.yodyinfo.path, 'rpc'))
    }
  }
}
