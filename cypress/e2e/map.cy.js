describe("application test", () => {
  it("map with markers should be displayed and marker click should open modal to make changes", () => {
    cy.visit("/")

    // Map should be visible
    cy.get("[data-test='map']").should("exist")

    // Clicking on an existing marker
    cy.get("[data-test='map']").click(25.543009, 58.674264)

    // Modal should open after click
    cy.get("[data-test='modal']").should("exist")

    // Changing marker content
    cy.get('select[name="status"]').select("true")
    cy.get('textarea[name="details"]').clear().type("Mock details about marker")

    // Saving changes and closing modal
    cy.contains("Save changes").click()
    cy.get("[data-test='modal']").should("not.exist")
  })
})
