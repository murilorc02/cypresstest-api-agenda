describe('Rotas de usuário', () => {
    
    let userId;
    it('Um novo usuário deve ser criado com sucesso', () => {
        const usuario = {
            nome: 'user',
            email: 'teste@gmail.com',
            senha: 'pswd'
        };
        
    cy.request('POST', '/usuario', usuario)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.nome).to.eq(usuario.nome);
        expect(response.body.email).to.eq(usuario.email);
        expect(response.body.senha).to.eq(usuario.senha);
        userId = response.body.id;
      });
  });

  it('Um erro deve ser retornado ao inserir dados inválidos', () => {
    const invalidUser = {
        nome: null,
        email: null,
        senha: null
    };

    cy.request({
      method: 'POST',
      url: '/usuario',
      body: invalidUser,
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
    });
  });

  it('Todos os usuários devem ser listados', () => {
    cy.request('GET', '/usuario')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
  });

  it('Um usuário específico deve ser encontrado', () => {
    cy.request('GET', `/usuario/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', userId);
      });
  });

  it('Deve retornar um erro ao procurar por usuário inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/usuario/99999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Deve atualizar as informações de um usuário específico', () => {
    const dadosAtualizados = {
      nome: 'Teste Atualizado',
      email: 'update@gmail.com',
      senha: 'pswdupdate'
    };

    cy.request('PATCH', `/usuario/${userId}`, dadosAtualizados)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq(dadosAtualizados.nome);
        expect(response.body.email).to.eq(dadosAtualizados.email);
      });
  });

  it('O usuário deve ser excluido', () => {
    cy.request('DELETE', `/usuario/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
}); 