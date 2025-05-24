describe('Teste da API de Integrações', () => {
    
    const api = 'http://localhost:3000/usuario'
    const token = '';

    it('listar', () => {
        cy.request(
            {
                method: 'GET',
                url: api
            }
        ).then((response) => {
            expect(response.status).to.eq(200)
        });
    })
})