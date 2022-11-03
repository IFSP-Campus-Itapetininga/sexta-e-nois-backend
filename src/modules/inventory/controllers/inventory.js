const Item = require('../models/Item')
const ItemTransaction = require('../models/ItemTransaction')

const itemModel = Item()
const itemTransactionModel = ItemTransaction()

const listItems = async (req, res) => {
  try {
    const items = await itemModel.list()
    const response = {
      items: items.map(function (item) {
        return {
          iditem: item.iditem,
          description: item.description,
          active: item.active,
          curbal: item.curbal,
          lastPurchase: item.lastPurchase.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', '')
        }
      })
    }
    res.send(response.items)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const findItem = async (req, res) => {
  const { iditem } = req.params

  try {
    let item = await itemModel.find(iditem)
    item = [item]
    const response = {
      item: item.map(function (item) {
        return {
          iditem: item.iditem,
          description: item.description,
          active: item.active,
          curbal: item.curbal,
          lastPurchase: item.lastPurchase.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', '')
        }
      })
    }
    item = response.item[0]
    res.send(item)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createItem = async (req, res) => {
  const { description, active, curbal, lastPurchase } = req.body

  try {
    const item = await itemModel.create({ description, active, curbal, lastPurchase })

    res.status(201).send({ iditem: item[0] })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateItem = async (req, res) => {
  const { iditem } = req.params
  const { description, active, curbal, lastPurchase } = req.body

  try {
    await itemModel.update(iditem, { description, active, curbal, lastPurchase })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeItem = async (req, res) => {
  const { iditem } = req.params

  try {
    await itemModel.remove(iditem)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listItemTransactions = async (req, res) => {
  const { iditem } = req.params
  try {
    let item = await itemModel.find(iditem)
    item = [item]
    const transactions = await itemTransactionModel.list(iditem)
    const responseTransaction = {
      transactions: transactions.map(function (transaction) {
        return {
          idinventory_item_transaction: transaction.idinventory_item_transaction,
          quantity: parseInt(transaction.quantity),
          user: transaction.user,
          memo: transaction.memo,
          transdate: transaction.transdate.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', ''),
          inventory_item_iditem: transaction.inventory_item_iditem
        }
      })
    }
    let responseItem = {
      item: item.map(function (item) {
        return {
          iditem: item.iditem,
          description: item.description,
          curbal: parseInt(item.curbal),
          active: item.active,
          lastPurchase: item.lastPurchase.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', ''),
          transactions: responseTransaction.transactions
        }
      })
    }
    responseItem = responseItem.item[0]
    res.send(responseItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createItemTransaction = async (req, res) => {
  const { iditem, quantity, user, memo, transdate } = req.body
  const curbal = await itemModel.getCurbal(iditem)
  const itemcurbal = parseInt(curbal[0].qtd)

  if (itemcurbal + parseInt(quantity) >= 0) {
    try {
      const transaction = await itemTransactionModel.create({ iditem_fk: iditem, quantity, user, memo, transdate })
      if (transaction) {
        let date = new Date()
        date = date.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', '')
        const updateItem = await itemModel.updateLastPurchase(iditem, date)
        const updateCurbal = await itemModel.updateCurbal(iditem)
        if (updateItem && updateCurbal) {
          console.log(updateItem)
          console.log(updateCurbal)
        }
      }
      res.status(201).send({ iditem_fk: transaction[0] })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } else {
    res.status(304).json({ message: 'Balance cannot be less than zero' })
  }
}

module.exports = {
  listItems,
  createItem,
  findItem,
  updateItem,
  removeItem,
  listItemTransactions,
  createItemTransaction
}
