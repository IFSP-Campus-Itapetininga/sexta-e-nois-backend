const Order = require('./Order')
const Client = require('./Client')

module.exports = () => {
  const getFormatedOrderResponse = async (date) => {
    try {
      const { data } = await Order().list({ date })

      return {
        total_sales: data?.length,
        total_colected: data?.reduce((acc, el) => {
          return acc + el.valor_total
        }, 0)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const getFormatedClientsResponse = async (date) => {
    try {
      const { data } = await Client().list({ date })

      return {
        total_clients: data?.length
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const list = async (props) => {
    const date = {
      from: props?.initial_date,
      to: props?.final_date
    }

    const [order, clients] = await Promise.all([
      getFormatedOrderResponse(date),
      getFormatedClientsResponse(date)
    ])

    return {
      order,
      clients
    }
  }

  return { list }
}
