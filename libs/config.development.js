const logger = require("./logger")

module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`)
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: "Nta$K_AP1",
    jwtSession: {session: false}
}