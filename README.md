# crud-typescripto
  |Rotas       | Method  | Body                                                 |  Header  | Descrição|
  -------------| --------| -----------------------------------------------------| -------- |--------- |
 | /user       | Get     | =====                                                |  =====   | Retorna |todos os usuarios|
 | /user     |    POST   |  name,email,phone                                     |  ====     |Cadastra usuario|
  |/user/phone |  PUT     | email,phone                                            id       atualiza o telefone do usuario|
  |/user/email   PUT      email,phone                                            id       atualiza o email do usuario
  |/user         DELETE   email                                                  id       remove o usuario se o id no header e id que trazer na consulta forem iguais
  |/address      GET      =====                                                  =====    traz todos os usuarios e seus enderecos
  |/address     | POST |    street, city, state, zipcode, country          |        id       |cadastra e relaciona o usuario com seu endereco|
  |/address   |   PUT   |  newstreet, newcity, newstate, newzipcode, newcountry|   id    |   atualiza o endereco com base no new que for utilizado|
