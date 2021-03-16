const jwt = require("jwt-simple")

describe("Routes: Tasks", () => {
    const Users = app.db.models.Users
    const Tasks = app.db.models.Tasks
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
            .then(user => {
                Tasks
                    .destroy({where: {}})
                    .then(() => Tasks.bulkCreate([{
                        id: 1,
                        title: "Work",
                        UserId: user.id
                    }, {
                        id: 2,
                        title: "Study",
                        UserId: user.id
                    }]))
                    .then(done())
            })
    })
    
    describe("GET /tasks", () => {
        describe("status 200", () => {
            it("returns a list of tasks", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.get("/tasks")
                            .set("Authorization", `JWT ${token}`)
                            .expect(200)
                            .end((err, res) => {
                                expect(res.body).to.have.length(2)
                                expect(res.body[0].title).to.eql("Work")
                                expect(res.body[1].title).to.eql("Study")
                                done(err)
                            })
                    })
                
            })
        })
    })
    describe("POST /tasks/", () => {
        describe("status 200", () => {
            it("create a new tasks", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.post("/tasks")
                            .set("Authorization", `JWT ${token}`)
                            .send({title: "Run"})
                            .expect(200)
                            .end((err, res) => {
                                expect(res.body.title).to.eql("Run")
                                expect(res.body.done).to.be.false
                                done(err)
                            })
                    })
            })
        })
    })
    describe("GET /tasks/:id", () => {
        describe("status 200", () => {
            it("return one tasks", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.get("/tasks/1")
                            .set("Authorization", `JWT ${token}`)
                            .expect(200)
                            .end((err, res) => {
                                expect(res.body.title).to.eql("Work")
                                done(err)
                            })
                    })
            })
        })
        describe("status 404", () => {
            it("throws error when task not exists", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.get("/tasks/0")
                            .set("Authorization", `JWT ${token}`)
                            .expect(404)
                            .end((err, res) => done(err))
                    })
            })
        })
    })
    describe("PUT /tasks/:id", () => {
        describe("status 204", () => {
            it("updates a task", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.put("/tasks/1")
                            .set("Authorization", `JWT ${token}`)
                            .send({
                                title: "Travel",
                                done: true
                            })
                            .expect(204)
                            .end((err, res) => done(err))
                    })
            })
        })
    })
    describe("DELETE /tasks/:id", () => {
        describe("status 204", () => {
            it("removes a task", done => {
                request.post("/token")
                    .send({
                        email: "johnpeter@mail.net",
                        password: "12345"
                    })
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        token = res.body.token

                        request.delete("/tasks/1")
                            .set("Authorization", `JWT ${token}`)
                            .expect(204)
                            .end((err, res) => done(err))
                    })
            })
        })
    })
})