const { BASE_URL, login_email, login_password } = require('../../config')

describe('Verify signup', () => {
	beforeEach(function () {
		cy.visit(BASE_URL)
		cy.get('#nav-link-accountList').trigger('mouseover')
		cy.contains('Start here.').click()
	})

	afterEach(function () {
		cy.reload()
		cy.clearCookies()
	})

	it('register with valid data', () => {
		var randomNumber = ''
		let email = ''
        var angka = '1234'

		for (var i = 0; i < 3; i++)
			randomNumber += angka.charAt(Math.floor(Math.random() * angka.length))

        email = 'test'+randomNumber+'@test.com'

		cy.get('#ap_customer_name').type('QAtest')
		cy.get("input[type='email']").type(email)
		cy.get("input[name='password']").type(login_password)
		cy.get("input[name='passwordCheck']").type(login_password)

		cy.get('#continue').click()

		//verify success/next page
		cy.get('.a-box').should('be.visible')
	})

	it('register with blank name data', () => {
		cy.get("input[type='email']").type('test@test.com')
		cy.get("input[name='password']").type(login_password)
		cy.get("input[name='passwordCheck']").type(login_password)

		cy.get('#continue').click()

		//verify error message
		cy
			.get('#auth-customerName-missing-alert')
			.should('contain.text', 'Enter your name')
	})
	it('register with invalid email format', () => {
		cy.get('#ap_customer_name').type('QAtest')
		cy.get("input[type='email']").type('test@')
		cy.get("input[name='password']").type(login_password)
		cy.get("input[name='passwordCheck']").type(login_password)

		cy.get('#continue').click()

		//verify error message
		cy
			.get('#auth-email-invalid-claim-alert')
			.should(
				'contain.text',
				'Wrong or Invalid email address or mobile phone number. Please correct and try again.'
			)
	})
	it('register with does not match password and password confirmation', () => {
		cy.get('#ap_customer_name').type('QAtest')
		cy.get("input[type='email']").type('test@test.com')
		cy.get("input[name='password']").type(login_password)
		cy.get("input[name='passwordCheck']").type('Masuk123')

		cy.get('#continue').click()

		//verify error message
		cy
			.get('#auth-password-mismatch-alert')
			.should('contain.text', 'Passwords must match')
	})
})
