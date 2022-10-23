const Item = require('../models/Item')

const itemModel = Item()

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

module.exports = {
  listItems,
  createItem,
  findItem,
  updateItem,
  removeItem
}
