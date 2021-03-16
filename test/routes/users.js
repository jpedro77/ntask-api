const jwt = require("jwt-simple")

describe("Routes: Users", () => {
    const Users = app.db.models.Users
    const jwtSecret = app.libs.config.jwtSecret
    let token

    before(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create({
                name: "John Peter",
                email: "johnpeter@mail.net",
                password: "12345"
            }))
            .then(done())
    })

    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.get("/user")
                            .set("Authorization", `JWT ${token}`)
                            .expect(200)
                            .end((err, res) => {
                                expect(res.body.name).to.eql("John Peter")
                                expect(res.body.email).to.eql("johnpeter@mail.net")
                                done(err)
                            })
                    })
            })
        })
    })

    describe("DELETE /user", () => {
        describe("stastus 200", () => {
            it("deletes an authenticated user", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.delete("/user")
                            .set("Authorization", `JWT ${token}`)
                            .expect(204)
                            .end((err, res) => done(err))
                    })
            })
        })
    })

    describe("POST /users", () => {
        describe("stastus 200", () => {
            it("creates a new user", done => {
                
                request.post("/users")
                    .send({
                        name: "Mary",
                        email: "mary@mail.net",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Mary")
                        expect(res.body.email).to.eql("mary@mail.net")
                        done(err)
                    })
            })
        })
    })
})