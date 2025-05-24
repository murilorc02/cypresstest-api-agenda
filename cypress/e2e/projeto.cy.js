describe('Rotas de projeto', () => {
    
    let projectId;
    it('Um novo projeto deve ser criado com sucesso', () => {
        const projeto = {
            nome: 'projeto',
            usuarioId: 1
        };
        
    cy.request('POST', '/projeto', projeto)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.nome).to.eq(projeto.nome);
        expect(response.body.usuarioId).to.eq(projeto.usuarioId);
        projectId = response.body.id;
      });
  });

  it('Um erro deve ser retornado ao inserir dados inválidos', () => {
    const invalidproject = {
          nome: null,
          usuarioId: null
    };

    cy.request({
      method: 'POST',
      url: '/projeto',
      body: invalidproject,
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
    });
  });

  it('Todos os projetos devem ser listados', () => {
    cy.request('GET', '/projeto')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
  });

  it('Um projeto específico deve ser encontrado', () => {
    cy.request('GET', `/projeto/${projectId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', projectId);
      });
  });

  it('Deve retornar um erro ao procurar por projeto inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/projeto/99999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Deve atualizar as informações de um projeto específico', () => {
    const dadosAtualizados = {
      nome: 'Teste Atualizado',
      usuarioId: 4
    };

    cy.request('PATCH', `/projeto/${projectId}`, dadosAtualizados)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq(dadosAtualizados.nome);
        expect(response.body.usuarioId).to.eq(dadosAtualizados.usuarioId);
      });
  });

  it('O projeto deve ser excluido', () => {
    cy.request('DELETE', `/projeto/${projectId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
}); 