const Item = require('../models/Item')
const ItemTransaction = require('../models/ItemTransaction')
const ItemHasVendor = require('../models/ItemHasVendor')

const itemModel = Item()
const itemTransactionModel = ItemTransaction()
const itemHasVendorModel = ItemHasVendor()

const listItems = async (req, res) => {
  try {
    const items = await itemModel.list()
    const response = {
      items: items.map(function (item) {
        return {
          ...item,
          saldo: parseInt(item.saldo)
        }
      })
    }
    res.send(response.items)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const findItem = async (req, res) => {
  const { itemid } = req.params

  try {
    let item = await itemModel.find(itemid)
    item = [item]
    const response = {
      item: item.map(function (item) {
        return {
          ...item,
          saldo: parseInt(item.saldo)
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
  const { descricao, ativo, saldo } = req.body

  try {
    const item = await itemModel.create({ descricao, ativo, saldo })

    res.status(201).send({ itemid: item[0] })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateItem = async (req, res) => {
  const { itemid } = req.params
  const { descricao, ativo, saldo } = req.body

  try {
    await itemModel.update(itemid, { descricao, ativo, saldo })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeItem = async (req, res) => {
  const { itemid } = req.params
  try {
    await itemModel.remove(itemid)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listItemTransactions = async (req, res) => {
  const { itemid } = req.params
  try {
    let item = await itemModel.find(itemid)
    item = [item]
    const transactions = await itemTransactionModel.list(itemid)
    const responseTransaction = {
      transactions: transactions.map(function (transaction) {
        return {
          ...transaction,
          quantidade: parseInt(transaction.quantidade)
        }
      })
    }
    let responseItem = {
      item: item.map(function (item) {
        return {
          ...item,
          saldo: parseInt(item.saldo),
          transacoes: responseTransaction.transactions
        }
      })
    }
    responseItem = responseItem.item[0]
    res.send(responseItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listAllTransactions = async (req, res) => {
  try {
    const transactions = await itemTransactionModel.listAll()
    const responseTransaction = {
      transactions: transactions.map(function (transaction) {
        return {
          ...transaction,
          quantidade: parseInt(transaction.quantidade)
        }
      })
    }
    res.send(responseTransaction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createItemTransaction = async (req, res) => {
  const { itemid, quantidade, usuario, memo, datatransacao } = req.body
  const curbal = await itemModel.getCurbal(itemid)
  const itemcurbal = parseInt(curbal[0].qtd)

  if (itemcurbal + parseInt(quantidade) >= 0 || curbal[0].qtd === null) {
    try {
      const transaction = await itemTransactionModel.create({ item_itemid: itemid, quantidade, usuario, memo, datatransacao })
      if (transaction) {
        // eslint-disable-next-line no-unused-vars
        const updateCurbal = await itemModel.updateCurbal(itemid)
      }
      res.status(201).send({ transacaoid: transaction[0] })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } else {
    res.status(304).json({ message: 'Balance cannot be less than zero' })
  }
}

const createItemHasVendor = async (req, res) => {
  try {
    if (req.body.itemid && req.body.fornecedorid) {
      const { itemid, fornecedorid } = req.body
      const ItemHasVendor = await itemHasVendorModel.create(itemid, fornecedorid, { item_itemid: itemid, fornecedor_fornecedorid: fornecedorid })
      if (ItemHasVendor.status === 400) {
        res.status(400).send(ItemHasVendor.message)
      } else {
        res.status(201).send(ItemHasVendor.message)
      }
    } else {
      res.status(400).send('fornecedorid or iditem was not found')
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const listItemHasVendor = async (req, res) => {
  try {
    if (req.params.itemid !== undefined) {
      const itemid = req.params.itemid
      const ItemHasVendor = await itemHasVendorModel.listByItem({ item_itemid: itemid })
      if (ItemHasVendor) {
        const vendors = []
        for (let x = 0; x < ItemHasVendor.length; x++) {
          const vendor = ItemHasVendor[x].fornecedor_fornecedorid
          vendors.push(vendor)
        }
        const result = await itemModel.findInVendors(vendors)
        res.status(200).send({ result })
      } else {
        res.status(404).send()
      }
    } else {
      res.status(400).json({ message: 'itemid not found' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const listVendorHasItem = async (req, res) => {
  try {
    if (req.params.fornecedorid !== undefined) {
      const fornecedorid = req.params.fornecedorid
      const ItemHasVendor = await itemHasVendorModel.listByVendor({ fornecedor_fornecedorid: fornecedorid })
      if (ItemHasVendor) {
        const items = []
        for (let x = 0; x < ItemHasVendor.length; x++) {
          const item = ItemHasVendor[x].item_itemid
          items.push(item)
        }
        const result = await itemModel.findInItems(items)
        const response = {
          item: result.map(function (item) {
            return {
              ...item,
              saldo: parseInt(item.saldo)
            }
          })
        }
        res.status(200).send({ response })
      } else {
        res.status(404).send()
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeItemHasVendor = async (req, res) => {
  try {
    if (req.body.itemid && req.body.fornecedorid) {
      const { itemid, fornecedorid } = req.body
      await itemHasVendorModel.remove(itemid, fornecedorid)
      res.status(204).send()
    } else {
      res.status(400).send('fornecedorid or iditem was not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  listItems,
  createItem,
  findItem,
  updateItem,
  removeItem,
  listItemTransactions,
  createItemTransaction,
  createItemHasVendor,
  listItemHasVendor,
  listVendorHasItem,
  removeItemHasVendor,
  listAllTransactions
}
