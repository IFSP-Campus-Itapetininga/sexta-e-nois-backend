const fs = require('fs')
const path = require('path')

const modulesPath = path.resolve(path.join(__dirname, '/../src/'), 'modules')
const modulesExisting = fs.readdirSync(modulesPath)

module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Criação de módulo',
    prompts: [
      {
        type: 'list',
        name: 'nameModule',
        message: 'Qual o seu módulo, aonde será criado o model?',
        choices: modulesExisting
      },
      {
        type: 'input',
        name: 'name',
        message: 'Qual será o nome do model?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{nameModule}}/models/{{pascalCase name}}.js',
        templateFile: './templates/model.js.hbs'
      }
    ]
  })
}
