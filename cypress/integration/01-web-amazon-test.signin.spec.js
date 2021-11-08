const { BASE_URL, login_email, login_password } = require('../../config')

describe('Verify sign in amazon web', () => {
	let errorBadChars = 'Enter the characters as they are given in the challenge.'
	let errorSignIn = 'Enter your email or mobile phone number'

	beforeEach(function () {
		cy.visit(BASE_URL)
		cy.get('#nav-link-accountList').click()
	})
	afterEach(function () {
		cy.reload()
		cy.clearCookies()
	})

	it('login with blank email/phone number', () => {
		cy.get('input[name="email"]').invoke('val', '')
		cy.get('#continue').click()

		//validate error message
		cy
			.get('#auth-email-missing-alert')
			.should('contain.text', errorSignIn)
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
		cy.get('li').should('be.visible').and('contain.text', errorBadChars)
	})
})
