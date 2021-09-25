### ServerlessJS + AWS + Lambda + DynamoDB

- Full-featured: ServerlessJS + AWS + Lambda + DynamoDB

# Backend Development

![](http://www.accessyexcel.com/wp-content/uploads/2018/03/aws.png)

![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg)

> Proyecto realizado como parte del Reto Técnico de Indra-Rimac
> Amazon Web Services

### Importante

Existencia de 2 Modelos:

- Starship (haciendo referencia a las naves estelares del API Start War)
- Vehicle (haciendo referencia a los vehículos del API Start War)

### Plugins

Este proyecto se uso plugins para mejorar facilitar el desarollo.
Listado:

| Plugin                                 | README                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| serverless-offline                     | [https://github.com/dherault/serverless-offline/blob/master/README.md]                        |
| serverless-plugin-include-dependencies | [https://github.com/dougmoscrop/serverless-plugin-include-dependencies/blob/master/README.md] |

### Initialitation

This project requires [Node.js](https://nodejs.org/) v12+ to run.
Install the dependencies and devDependencies.

```sh
$ npm install -d
```

or

```sh
$ npm install --save
```

## Serverless Framework

This project requires [Serverless.js](https://www.serverless.com/) to run.

```sh
$ npm install serverless -g
```

### KEYs CONFIGURATION

- Es necesario configurar los KEYS de AWS

```sh
$ serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET_KEY
```

### Simulation Execute Lambdas

Para realizar pruebas antes de un DEPLOY, el siguiente comando:

```sh
sls offline
```

Esto levantará el proyecto por default en 'localhost' en el puerto '3000'

### Testing

Testeo con Jest.

Para poder realizar TDD con Jest realizar los siguientes comandos.

Para el modelo Starship y Vehicle

```sh
npm run test
```

Esto realizará las pruebas unitarias para el modelo Starship (haciendo referencia a las naves estelares del API StarWar)
Esto realizará las pruebas unitarias para el modelo Vehicle (haciendo referencia a lo vehículos del API StarWar)

## License

Developer Software : Edgar Jhonatan Delgadillo Montano | jdmkrd@gmail.com
OPEN SOURCE
