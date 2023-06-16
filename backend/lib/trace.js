import { createLogger } from "bunyan";

const log = createLogger({
  name: "Todoist",
  stream: process.stdout,
});

export default log;