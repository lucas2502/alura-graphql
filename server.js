const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')



conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const resolvers = {
  Query: {
    status: () => "Servidor rodando!" 
  },
  Mutation: {
    adicionarCliente: (root, params ) => ({
      id: 1,
      nome: params.nome,
      cpf: params.cpf 
    })
  }
}
const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.grapghql'

})

servidor.start(() => console.log('Servidor ouvindo'))