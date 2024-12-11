describe("GET Users List", () => {
  it("should return a list of users with status 200", () => {
    cy.request("GET", "https://reqres.in/api/users?page=2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("page", 2);
      expect(response.body.data).to.be.an("array");
      expect(response.body.data[0]).to.have.property("id");
    });
  });
});

describe("GET Single User", () => {
  it("should return a status 200", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", 2);
      expect(response.body.data).to.have.property("email");
      expect(response.body.data).to.have.property("first_name");
      expect(response.body.data).to.have.property("last_name");
      expect(response.body.data).to.have.property("avatar");
    });
  });
});

describe("GET Single User Not Found", () => {
  it("should return a status 404", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false, // Allow handling of 404
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});

describe("GET List <Resource>", () => {
  it("should return a status 200", () => {
    cy.request("GET", "https://reqres.in/api/unknown").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("page");
      expect(response.body.data).to.be.an("array");
      expect(response.body.data[0]).to.have.property("id");
      expect(response.body.data[0]).to.have.property("name");
      expect(response.body.data[0]).to.have.property("year");
      expect(response.body.data[0]).to.have.property("color");
      expect(response.body.data[0]).to.have.property("pantone_value");
    });
  });
});

describe("GET Single <Resource>", () => {
  it("should return a status 200", () => {
    cy.request("GET", "https://reqres.in/api/unknown/2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", 2);
      expect(response.body.data).to.have.property("name");
      expect(response.body.data).to.have.property("year");
      expect(response.body.data).to.have.property("color");
      expect(response.body.data).to.have.property("pantone_value");
    });
  });
});

describe("GET Single <Resource> Not Found", () => {
  it("should return a status 404", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/unknown/23",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});

describe("POST Create User", () => {
  it("should create a new user and return status 201", () => {
    cy.request("POST", "https://reqres.in/api/users", {
      name: "Swan",
      job: "developer",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "Swan");
      expect(response.body).to.have.property("job", "developer");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("createdAt");
    });
  });
});

describe("PUT Update User", () => {
  it("should update a user and return status 200", () => {
    cy.request("PUT", "https://reqres.in/api/users/2", {
      name: "morpheus",
      job: "zion resident",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "morpheus");
      expect(response.body).to.have.property("job", "zion resident");
      expect(response.body).to.have.property("updatedAt");
    });
  });
});

describe("PATCH Update User", () => {
  it("should update a user and return status 200", () => {
    cy.request("PATCH", "https://reqres.in/api/users/2", {
      name: "morpheus",
      job: "zion resident",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "morpheus");
      expect(response.body).to.have.property("job", "zion resident");
      expect(response.body).to.have.property("updatedAt");
    });
  });
});

describe("DELETE User", () => {
  it("should delete a user and return status 204", () => {
    cy.request({
      method: "DELETE",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});

describe("POST Register - Successful", () => {
  it("should return 200 and a valid response with id and token", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 4);
      expect(response.body).to.have.property("token", "QpwL5tke4Pnpja7X4");
    });
  });
});

describe("POST Register - Unsuccessful", () => {
  it("should return 400 and an error message for missing password", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: {
        email: "eve.holt@reqres.in",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });
});

describe("POST Login - Successful", () => {
  it("should return 200 and a valid token", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token", "QpwL5tke4Pnpja7X4");
    });
  });
});

describe("POST Login - Unsuccessful", () => {
  it("should return 400 and an error message for missing password", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "peter@klaven",
      },
      failOnStatusCode: false, // Allow Cypress to handle non-2xx responses
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });
});

describe("GET Delayed Response", () => {
  it("should return 200 and valid delayed user data", () => {
    cy.request("GET", "https://reqres.in/api/users?delay=3").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("page", 1);
        expect(response.body.data).to.be.an("array");
      }
    );
  });
});
