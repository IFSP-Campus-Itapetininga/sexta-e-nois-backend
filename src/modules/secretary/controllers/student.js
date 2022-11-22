const Student = require('../models/Student')
const { ValidationStudent } = require('../utils')

const studentModel = Student()

const create = async (req, res) => {
  const data = req.body
  const validation = ValidationStudent.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }
  try {
    await studentModel.create(data)

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const students = await studentModel.list()

    res.send(students)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const student = await studentModel.find(id)

    res.send(student)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const validation = ValidationStudent.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }

  try {
    await studentModel.update(id, data)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await studentModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
