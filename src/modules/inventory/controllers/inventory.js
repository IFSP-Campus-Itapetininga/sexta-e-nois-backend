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

  if (itemcurbal + parseInt(quantity) >= 0 || curbal[0].qtd === null) {
    try {
      const transaction = await itemTransactionModel.create({ inventory_item_iditem: iditem, quantity, user, memo, transdate })
      if (transaction) {
        let date = new Date()
        date = date.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', '')
        // let dataFormatada = date.toISOString().replace('T', ' ').replace('Z', '').slice(0, 19)
        // eslint-disable-next-line no-unused-vars
        const updateItem = await itemModel.updateLastPurchase(iditem, date)
        // eslint-disable-next-line no-unused-vars
        const updateCurbal = await itemModel.updateCurbal(iditem)
      }
      res.status(201).send({ iditem_fk: transaction[0] })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } else {
    res.status(304).json({ message: 'Balance cannot be less than zero' })
  }
}

const createItemHasVendor = async (req, res) => {
  try {
    if (req.body.iditem && req.body.vendorid) {
      const { iditem, vendorid } = req.body
      const ItemHasVendor = await itemHasVendorModel.create(iditem, vendorid, { inventory_item_iditem: iditem, inventory_vendor_idinventory_vendor: vendorid })
      console.log(ItemHasVendor)
      // console.log(ItemHasVendor.message)
      if (ItemHasVendor.status === 400) {
        res.status(400).send(ItemHasVendor.message)
      } else {
        res.status(201).send(ItemHasVendor.message)
      }
    } else {
      res.status(400).send('vendorid or iditem was not found')
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const listItemHasVendor = async (req, res) => {
  try {
    if (req.params.iditem !== undefined) {
      const iditem = req.body.iditem
      const ItemHasVendor = await itemHasVendorModel.listByItem({ inventory_item_iditem: iditem })
      console.log('Items' + ItemHasVendor)
      if (ItemHasVendor) {
        const vendors = []
        for (let x = 0; x < ItemHasVendor.length; x++) {
          const vendor = ItemHasVendor[x].inventory_vendor_idinventory_vendor
          vendors.push(vendor)
        }
        const result = await itemModel.findInVendors(vendors)
        res.status(200).send({ result })
      } else {
        res.status(404).send()
      }
    } else if (req.body.vendorid !== undefined) {
      const vendorid = req.body.vendorid
      const ItemHasVendor = await itemHasVendorModel.listByVendor({ inventory_vendor_idinventory_vendor: vendorid })
      console.log('Vendorids' + ItemHasVendor)
      if (ItemHasVendor) {
        const items = []
        for (let x = 0; x < ItemHasVendor.length; x++) {
          const item = ItemHasVendor[x].inventory_item_iditem
          items.push(item)
        }
        const result = await itemModel.findInItems(items)
        res.status(200).send({ result })
      } else {
        res.status(404).send()
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const listVendorHasItem = async (req, res) => {
  try {
    if (req.params.vendorid !== undefined) {
      const vendorid = req.body.vendorid
      const ItemHasVendor = await itemHasVendorModel.listByVendor({ inventory_vendor_idinventory_vendor: vendorid })
      console.log('Vendorids' + ItemHasVendor)
      if (ItemHasVendor) {
        const items = []
        for (let x = 0; x < ItemHasVendor.length; x++) {
          const item = ItemHasVendor[x].inventory_item_iditem
          items.push(item)
        }
        const result = await itemModel.findInItems(items)
        res.status(200).send({ result })
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
    if (req.body.iditem && req.body.vendorid) {
      const { iditem, vendorid } = req.body
      await itemHasVendorModel.remove(iditem, vendorid)
      res.status(204).send()
    } else {
      res.status(400).send('vendorid or iditem was not found')
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
  removeItemHasVendor
}
