const Vendor = require('../models/Vendor')
const Address = require('../models/Address')
const Contact = require('../models/Contact')

const VendorModel = Vendor()
const AddressModel = Address()
const ContactModel = Contact()

const createVendor = async (req, res) => {
  const { name, description } = req.body
  if (req.body.address && req.body.contact) {
    const { street, number, state, city, zipCode, district, complement } = req.body.address
    const contactName = req.body.contact.name

    try {
      const vendor = await VendorModel.create({ vendor: name, description })
      if (vendor) {
        const address = await AddressModel.create({ street, number, state, city, zipCode, district, complement, inventory_vendor_idinventory_vendor: vendor[0] })

        const contactids = []
        const contactList = req.body.contact
        const tamanho = contactList.length
        for (let x = 0; x < tamanho; x++) {
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
    // const response = {
    //   items: items.map(function (item) {
    //     return {
    //       iditem: item.iditem,
    //       description: item.description,
    //       active: item.active,
    //       curbal: item.curbal,
    //       lastPurchase: item.lastPurchase.toJSON().replaceAll('/', '-').replaceAll('T', ' ').replaceAll('Z', '').replace('.000', '')
    //     }
    //   })
    // }

    res.send(vendor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createVendor,
  listVendor
}
