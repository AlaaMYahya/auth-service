import { app } from "./src/app";
import { AppDataSource } from "./src/config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3005, () => {
      console.log("Server is running on port 3005");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
