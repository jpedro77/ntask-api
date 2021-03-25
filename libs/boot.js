const http = require("http")
const https = require("https")
const fs = require("fs")

module.exports = app => {
    if (process.env.NODE_ENV !== "test") {

        const credentials = {
            key: fs.readFileSync("key.pem", "utf8"),
            cert: fs.readFileSync("cert.pem", "utf8")
        }

        app.db.sequelize.sync().then(() => {
            https.createServer(credentials, app)
                .listen(app.get("port_ssl"), () => {
                    console.log(`NTask API = porta ${app.get("port_ssl")}`)
                })
            http.createServer(app).listen(app.get("port"), () => {
                console.log(`NTask API = porta ${app.get("port")}`)
            })
        })
    }
}