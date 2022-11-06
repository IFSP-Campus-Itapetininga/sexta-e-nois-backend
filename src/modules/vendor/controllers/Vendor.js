const Vendor = require('../models/Vendor')
const Address = require('../models/Address')
const Contact = require('../models/Contact')

const VendorModel = Vendor()
const AddressModel = Address()
const ContactModel = Contact()

const createContact = async (req, res) => {
  try {
    const { name, email, phone, whatsapp, role, vendorid } = req.body
    const vendor = await VendorModel.find(vendorid)
    if (!vendor) { throw new Error('Address not found') }
    const contact = await ContactModel.create({ name, email, phone, whatsapp, role, inventory_vendor_idinventory_vendor: vendorid })
    if (contact) {
      res.status(201).send({ contactid: contact[0] })
    } else {
      res.status(400).json({ message: 'Not created' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeContact = async (req, res) => {
  const { contactid } = req.params

  try {
    await ContactModel.remove(contactid)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createVendor = async (req, res) => {
  const { name, description } = req.body
  if (req.body.address && req.body.contact) {
    const { street, number, state, city, zipCode, district, complement } = req.body.address
    try {
      const vendor = await VendorModel.create({ vendor: name, description })
      if (vendor) {
        const address = await AddressModel.create({ street, number, state, city, zipCode, district, complement, inventory_vendor_idinventory_vendor: vendor[0] })

        const contactids = []
        const contactList = req.body.contact
        const tamanho = contactList.length
        for (let x = 0; x < tamanho; x++) {
          const contactName = req.body.contact[x].name
          const element = contactList[x]
          console.log(element)
          const { email, phone, whatsapp, role } = req.body.contact[x]
          const contact = await ContactModel.create({ name: contactName, email, phone, whatsapp, role, inventory_vendor_idinventory_vendor: vendor[0] })
          contactids.push(contact[0])
        }
        res.status(201).send({ vendor: vendor[0], address: address[0], contact: contactids })
      } else {
        res.status(201).send({ vendor: vendor[0] })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } else {
    try {
      const vendor = await VendorModel.create({ vendor: name, description })
      res.status(201).send({ vendor: vendor[0] })
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
    const vendorid = req.params.vendorid
    let vendor = await VendorModel.find(vendorid)
    const address = await AddressModel.listByVendor(vendorid)
    const contact = await ContactModel.listByVendor(vendorid)
    vendor = [vendor]
    const response = {
      vendor: vendor.map(function (vendor) {
        return {
          vendor: vendor.vendor,
          description: vendor.description,
          contact: contact,
          address: address
        }
      })
    }
    vendor = response.vendor[0]

    res.send(vendor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateAddress = async (req, res) => {
  const { addressid, street, number, state, city, zipCode, district, complement } = req.body

  try {
    await AddressModel.update(addressid, { street, number, state, city, zipCode, district, complement })
    res.status(204).send()
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
  updateAddress
}
