module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Criação de módulo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'adicione nome do módulo'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{lowerCase name}}/routes.js',
        templateFile: './templates/routes.js.hbs'
      },
      {
        type: 'add',
        path: '../src/modules/{{lowerCase name}}/controllers/{{lowerCase name}}.js',
        templateFile: './templates/controllers.js.hbs'
      },
      {
        type: 'add',
        path: '../src/modules/{{lowerCase name}}/models/.gitkeep'
      }
    ]
  })
}
