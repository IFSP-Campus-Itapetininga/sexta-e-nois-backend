const Vendor = require('../models/Vendor')
const Address = require('../models/Address')
const Contact = require('../models/Contact')

const VendorModel = Vendor()
const AddressModel = Address()
const ContactModel = Contact()

const createContact = async (req, res) => {
  try {
    const { nome, email, telefone, whatsapp, funcao, fornecedorid } = req.body
    const vendor = await VendorModel.find(fornecedorid)
    if (!vendor) {
      throw new Error('Address not found')
    }
    const contact = await ContactModel.create({
      nome,
      email,
      telefone,
      whatsapp,
      funcao,
      fornecedor_fornecedorid: fornecedorid
    })
    if (contact) {
      res.status(201).send({ contatoid: contact[0] })
    } else {
      res.status(400).json({ message: 'Not created' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeContact = async (req, res) => {
  const { contatoid } = req.params

  try {
    await ContactModel.remove(contatoid)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createVendor = async (req, res) => {
  const { fornecedor, descricao, cnpj, ativo } = req.body
  if (req.body.endereco && req.body.contato) {
    const { rua, numero, estado, cidade, cep, bairro, complemento } =
      req.body.endereco
    try {
      const vendor = await VendorModel.create({
        fornecedor,
        descricao,
        cnpj,
        ativo
      })
      if (vendor) {
        const address = await AddressModel.create({
          rua,
          numero,
          estado,
          cidade,
          cep,
          bairro,
          complemento,
          fornecedor_fornecedorid: vendor[0]
        })

        const contactids = []
        const contactList = req.body.contato
        const tamanho = contactList.length
        for (let x = 0; x < tamanho; x++) {
          const contactName = req.body.contato[x].nome
          const { email, telefone, whatsapp, funcao } = req.body.contato[x]
          const contact = await ContactModel.create({
            nome: contactName,
            email,
            telefone,
            whatsapp,
            funcao,
            fornecedor_fornecedorid: vendor[0]
          })
          contactids.push(contact[0])
        }
        res.status(201).send({
          fornecedor: vendor[0],
          endereco: address[0],
          contato: contactids
        })
      } else {
        res.status(201).send({ fornecedor: vendor[0] })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } else {
    try {
      const vendor = await VendorModel.create({ fornecedor, descricao, cnpj })
      res.status(201).send({ fornecedor: vendor[0] })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

const listVendor = async (req, res) => {
  try {
    const vendor = await VendorModel.list()

    res.send(vendor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const findVendor = async (req, res) => {
  try {
    const fornecedorid = req.params.fornecedorid
    let vendor = await VendorModel.find(fornecedorid)
    const address = await AddressModel.listByVendor(fornecedorid)
    const contact = await ContactModel.listByVendor(fornecedorid)
    vendor = [vendor]
    const response = {
      vendor: vendor.map(function (vendor) {
        return {
          fornecedor: vendor.fornecedor,
          descricao: vendor.descricao,
          cnpj: vendor.cnpj,
          // eslint-disable-next-line object-shorthand
          contato: contact,
          // eslint-disable-next-line object-shorthand
          endereco: address
        }
      })
    }
    vendor = response.vendor[0]

    res.send(vendor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeVendor = async (req, res) => {
  const { fornecedorid } = req.params

  try {
    await VendorModel.remove(fornecedorid)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateAddress = async (req, res) => {
  const { enderecoid, rua, numero, estado, cidade, cep, bairro, complemento } =
    req.body

  try {
    await AddressModel.update(enderecoid, {
      rua,
      numero,
      estado,
      cidade,
      cep,
      bairro,
      complemento
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateContact = async (req, res) => {
  const { contatoid, nome, email, telefone, whatsapp, funcao } = req.body

  try {
    await ContactModel.update(contatoid, {
      nome,
      email,
      telefone,
      whatsapp,
      funcao
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const listContact = async (req, res) => {
  const fornecedorid = req.params.fornecedorid
  try {
    const contacts = await ContactModel.list(fornecedorid)

    res.send(contacts)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createVendor,
  listVendor,
  findVendor,
  createContact,
  removeContact,
  updateAddress,
  updateContact,
  removeVendor,
  listContact
}
