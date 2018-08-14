const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const { key }  = require('./secrets');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Some other name.',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml =>
        xml.GoodreadsResponse.author[0].name[0]
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Some other name.',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => { 
          fetch('https://www.goodreads.com/author/show.xml?id=${args.id}&key=${key}')
            .then(response => response.text())
            .then(parseXML)()
        }
      }
    })
  })
});