import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "demo",
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        // app.listen(3005, () => {
        //     console.log("Server is running on port 3005");
        //   });

    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })











// import "reflect-metadata";
// import { createExpressServer, useContainer as routingControllersUseContainer } from "routing-controllers";
// // import { Container } from "typedi";
// import { createConnection } from "typeorm";
// import { UserController } from "./src/controllers/user.controller";

// createConnection("default")
//   .then(() => {
//     const app = createExpressServer({
//       controllers: [UserController],
//     });

//     app.listen(3005, () => {
//       console.log("Server is running on port 3005");
//     });
//   })
  
//   .catch((error) => console.log("Error connecting to the database:", error));

