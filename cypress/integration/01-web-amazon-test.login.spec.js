const { BASE_URL, login_email, login_password } = require('../../config')

describe('Verify login amazon web', () => {
	let badChars = 'Enter the characters as they are given in the challenge.'

	before(function () {
		cy.visit(BASE_URL)
		cy.get('#nav-link-accountList').click()
	})

	it('login with invalid captcha characters', () => {
		cy.get("input[type='email']").type(login_email)
		cy.get('#continue').click()
		cy.get("input[type='password']").type(login_password)
		cy.get('#signInSubmit').click()

		cy.url().should('include', '/ap/signin')
		cy.get('span').should('be.visible').and('contain', login_email)
		cy.wait(3000)

		cy.get("input[type='password']").type(login_password)
		cy.get("input[name='guess']").type(login_password)

		cy.get('#signInSubmit').click()

		//validate error message
		cy.get('li').should('be.visible').and('contain.text', badChars)
	})
})
