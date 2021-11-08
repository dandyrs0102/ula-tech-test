describe('API Technical Test', () => {
	it('verify GET response single product', () => {
		cy
			.request({
				method: 'GET',
				url: 'https://fakestoreapi.com/products/1',
				headers: {
					connection: 'keep-alive',
				},
			})
			.then(res => {
				expect(res.status).to.eq(200)

				expect(res.body.id).to.eq(1)
				expect(res.body.title).to.eq(
					'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
				)
				expect(res.body.price).to.eq(109.95)
				expect(res.body.category).to.eq("men's clothing")
				expect(res.body.image).to.eq(
					'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
				)
				expect(res.body.rating.rate).to.eq(3.9)
				expect(res.body.rating.count).to.eq(120)
			})
	})

	it('POST - add new product', () => {

		cy
			.request({
				method: 'POST',
				url: 'https://fakestoreapi.com/products',
				headers: {
					connection: 'keep-alive',
				},
				body: JSON.stringify({
					"title": "test product POST",
					"price": 35.5,
					"description": "quick brown fox",
					"image": "http://example.com/",
					"category": "example"
				}),
			})
			.then((res) => {
				cy.log(JSON.stringify(res))
				expect(res.status).to.eq(200)
				expect(res.body).has.property('_id')
				expect(res.body).has.property('id', 21)
				
			
			})
		})
	})

