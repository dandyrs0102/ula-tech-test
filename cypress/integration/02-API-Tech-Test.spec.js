describe('API Technical Test', () => {
	it('GET - response single product', () => {
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
		let titleReq = 'Test post product'
		var priceReq = 50.5
		let descReq = 'Quick brown fox'
		let imageReq = 'http://example.com'
		let categoryReq = 'Example'

		cy
			.request({
				method: 'POST',
				url: 'https://fakestoreapi.com/products',
				headers: {
					connection: 'keep-alive',
				},
				body: {
					"title": titleReq,
					"price": priceReq,
					"description": descReq,
					"image": imageReq,
					"category": categoryReq
				}
			})
			.then((res) => {
				cy.log(JSON.stringify(res))
				expect(res.status).to.eq(200)
				expect(res.body).has.property('_id')
				expect(res.body).has.property('id', 21)
				expect(res.body).has.property('title', titleReq)
				expect(res.body).has.property('price', priceReq)
				expect(res.body).has.property('description', descReq)
				expect(res.body).has.property('image', imageReq)
				expect(res.body).has.property('category', categoryReq)
				
			
			})
		})
	})

