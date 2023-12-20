describe("Product page", () => {
  it("fetches product with handle [iced-chai-tea-latte]", () => {
    cy.visit("products/iced-chai-tea-latte")

    cy.get("h1").contains("Iced Chai Tea Latte")
  })

  it("adds a single product to the cart", () => {
    cy.visit("products/iced-chai-tea-latte")

    cy.wait(4000)

    cy.get("[data-cy=select_country_ca]").click()

    cy.wait(2000)

    cy.get("[data-cy=select_option_M]").click()

    cy.wait(2000)

    cy.get("[data-cy=add_to_cart]").click()

    cy.wait(4000)

    cy.get("[data-cy=cart_quantity]").contains("1")
  })

  it("adds two products to the cart", () => {
    cy.visit("products/iced-chai-tea-latte")

    cy.wait(4000)

    cy.get("[data-cy=select_country_ca]").click()

    cy.wait(2000)

    cy.get("[data-cy=select_option_M]").click()

    cy.wait(2000)

    cy.get("[data-cy=add_to_cart]").click()

    cy.wait(2000)

    cy.get("[data-cy=add_to_cart]").click()

    cy.wait(4000)

    cy.get("[data-cy=cart_quantity]").contains("2")
  })

  // it("changes the current image by clicking a thumbnail", () => {
  //   cy.visit("/products/t-shirt")

  //   cy.get("[data-cy=current_image]")
  //     .should("have.attr", "src")
  //     .and("match", /.+(tee\-black\-front).+/)

  //   cy.get("[data-cy=product_image_2]").click()

  //   cy.get("[data-cy=current_image]")
  //     .should("have.attr", "src")
  //     .and("match", /.+(tee\-black\-back).+/)
  // })
})
