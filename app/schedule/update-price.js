const {Subscription} = require('egg')

class UpdatePriceSubscription extends Subscription {
  static get schedule() {
    return {
      cron: '0 * * * *',
      type: 'worker'
    }
  }

  async subscribe() {
    let price = await this.ctx.service.misc.getPrices()
    await this.app.redis.hset(this.app.name, 'yody-price', JSON.stringify(price))
    this.app.io.of('/').to('coin')
      .emit('yody-price', price)
  }
}

module.exports = UpdatePriceSubscription