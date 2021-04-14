const express = require('express'); //instancio a express
const app = express() //e chamo na App.
const data = require("./data.json"); //apenas para simular dados do banco de dados

app.use(express.json()); //apenas dizendo ao express para usar o Json. 

//Verbos HTTP
/*
GET - RECEBER dados de um resource.
POST - ENVIAR dados para serem processadas por um resource.
PUT - ATUALIZAR dados de um resource.
DELETE - DELETAR dados de um resource.
*/

//Verbos HTTP GET com o EndPoints (/Clients)
app.get("/clients", function(request, response){ //callback onde envio request e retorna a response...
  response.json(data);  //forneço o response com os dados
}); 

//Verbos HTTP GET por ID do Cliente com o EndPoints (/Clients)
app.get("/clients/:id", function(request, response){
  const {id} = request.params; //coloca id como parametro.
  const client = data.find(cli => cli.id == id);  //busca no BD where cliente id é igual ao id passado no parametro.
  if(!client) return response.status(204).json(); //ocorreu a comunicação, porém sem conteudo
  response.json(client);//forneço o response com os dados
});

//Verbos HTTP POST com o EndPoints (/Clients)
app.post("/clients", function(request, response){
  const {nome, email} = request.body;

  //Crio aqui..  toda a logica de receber o dado e salvar o cliente no BD etc.. bla bla bla..
  
  response.json({nome, email}); //respondo o cliente com as mesmas informações para saber que deu certo.
});

//Verbos HTTP PUT por ID do Cliente com o EndPoints (/Clients)
app.put("/clients/:id", function(request, response){
  const {id} = request.params; //coloca id como parametro.
  const client = data.find(cli => cli.id == id);  //busca no BD where cliente id é igual ao id passado no parametro.
  
  if(!client) return response.status(204).json(); //ocorreu a comunicação, porém sem conteudo
  
  const {name, email} = request.body;
     client.name = name;
     client.email = email;
     
  
     response.json(client);

});

app.delete("/clients/:id", function(request, response){
  const {id} = request.params; //coloca id como parametro.

  const clientesFiltered = data.filter(cliente => cliente.id != id) //trazer toda a lista que o id do cliente é diferente do id do parametro.

  response.json(clientesFiltered); //retorna a lista filtrada.
});


app.listen(3000, function(){ //rodo o servidor, porta 3000, e deixo uma msg por uma callback
  console.log("server is running")
});

