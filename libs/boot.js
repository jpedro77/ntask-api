module.exports = app => {
    if (process.env.NODE_ENV !== "test") {
        app.db.sequelize.sync().then(() => {
            app.listen(app.get("port"), () => {
                console.log(`NTask API = porta ${app.get("port")}`)
            })
        })
    }
}