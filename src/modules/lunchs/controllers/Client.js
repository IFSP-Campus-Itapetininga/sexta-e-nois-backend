const ClientModel = require('../models/Client')
const validations = require('../utils/Validations')

const getClient = async (req, res) => {
  try {
    const { id } = req.params

    const data = await ClientModel().find(id)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const getClientByPhone = async (req, res) => {
  try {
    const { search } = req.query

    const data = await ClientModel().findByPhone(search)

    if (!data) {
      res.status(404).json({
        message: 'Cliente não encontrado'
      })

      return
    }

    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const getAllClients = async (req, res) => {
  try {
    const query = req.query

    const page = query.page - 1 || 0
    const limit = +query.limit || 10

    const data = await ClientModel().list(page, limit)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const createClient = async (req, res) => {
  try {
    const data = req.body
    const validation = validations.ValidationClientCreateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    const searchByPhone = await ClientModel().findByPhone(data.telefone)

    if (searchByPhone?.id) {
      res.status(400).json({
        message: 'Validation Error',
        data: [
          {
            message: '"telefone" must be unique',
            path: ['telefone'],
            type: 'object.unknown',
            context: {
              child: 'telefone',
              label: 'telefone',
              value: 'asd',
              key: 'telefone'
            }
          }
        ]
      })

      return
    }

    await ClientModel().create(data)

    res.status(201).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const updateClient = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const validation = validations.ValidationClientUpdateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await ClientModel().update(id, data)
    const client = await ClientModel().find(id)

    res.status(200).json(client)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id

    await ClientModel().remove(id)

    res.status(202).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

module.exports = {
  getClient,
  getClientByPhone,
  getAllClients,
  createClient,
  updateClient,
  deleteClient
}
