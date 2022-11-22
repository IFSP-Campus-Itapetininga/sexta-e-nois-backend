const StatiticsModel = require('../models/Statitics')
const validations = require('../utils/Validations')

const getMarmitaStatitics = async (req, res) => {
  try {
    const data = req.query
    const validation = validations.ValidationStatisticsSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    const response = await StatiticsModel().list(data)

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

module.exports = {
  getMarmitaStatitics
}
