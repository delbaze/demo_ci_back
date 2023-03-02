

import { DataSource, createConnection } from "typeorm";
import Wilder from "../entity/Wilder";
import Language from "../entity/Language";
import Note from "../entity/Note";


import * as path from "node:path";


export default new DataSource({ 
  type: "postgres", 
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: 'wilders',
  synchronize: true,
  entities: [Wilder, Note, Language],
  logging: ["query", "error"],
});
