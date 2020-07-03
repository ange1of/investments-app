import { Server } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api"

      this.get("/stock/:id", () => {
        return "";
      })
    },
  })

  return server
}