const { Router } = require('express')
const fs = require('fs')
const path = require('path')

const modulesPath = path.resolve(__dirname, 'modules')
const router = Router()

fs.readdir(modulesPath, (error, modules) => {
  if (error) {
    console.error('Fail to load routes')

    throw error
  }

  modules.forEach((folder) => {
    const { ROUTES_PREFIX, router: moduleRouter } = require(path.resolve(
      modulesPath,
      folder,
      'routes'
    ))

    router.use(ROUTES_PREFIX, moduleRouter)
  })
})

module.exports = router
