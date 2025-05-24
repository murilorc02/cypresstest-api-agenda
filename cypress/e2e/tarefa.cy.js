describe('Rotas de tarefa', () => {
    
    let taskId;
    it('Uma nova tarefa deve ser criada com sucesso', () => {
        const tarefa = {
            nome: 'tarefa',
            projetoId: 4
        };
        
    cy.request('POST', '/tarefa', tarefa)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.nome).to.eq(tarefa.nome);
        expect(response.body.projetoId).to.eq(tarefa.projetoId);
        taskId = response.body.id;
      });
  });

  it('Um erro deve ser retornado ao inserir dados inválidos', () => {
    const invalidTask = {
      nome: null,
      projetoId: null
    };

    cy.request({
      method: 'POST',
      url: '/tarefa',
      body: invalidTask,
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
    });
  });

  it('Todas as tarefas devem ser listadas', () => {
    cy.request('GET', '/tarefa')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
  });

  it('Uma tarefa específica deve ser encontrada', () => {
    cy.request('GET', `/tarefa/${taskId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', taskId);
      });
  });

  it('Deve retornar um erro ao procurar por tarefa inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/tarefa/99999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Deve atualizar as informações de uma tarefa específica', () => {
    const dadosAtualizados = {
      nome: 'tarefa teste',
      projetoId: 3
    };

    cy.request('PATCH', `/tarefa/${taskId}`, dadosAtualizados)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq(dadosAtualizados.nome);
        expect(response.body.projetoId).to.eq(dadosAtualizados.projetoId);
      });
  });

  it('A tarefa deve ser excluido', () => {
    cy.request('DELETE', `/tarefa/${taskId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
}); 