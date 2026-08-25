import { createServer, Model } from "miragejs";

export default function makeServer() {
  return createServer({
    models: {
      task: Model,
    },

    seeds: (server) => {
      server.create("task", {
        id: "n8xK3mP9vQ2L5rW7",
        title: "Complete project proposal",
        description:
          "Draft and finalize the Q3 project proposal for the client review meeting",
        status: "IN_PROGRESS",
        priority: "HIGH",
        createdAt: new Date("2026-08-20T09:30:00Z"),
        updatedAt: new Date("2026-08-24T14:15:00Z"),
      });
      server.create("task", {
        id: "tY7fR4dH1sM9pB3w",
        title: "Fix login page bug",
        description:
          "Resolve the authentication error occurring on the mobile login page",
        status: "DONE",
        priority: "MEDIUM",
        createdAt: new Date("2026-08-18T11:00:00Z"),
        updatedAt: new Date("2026-08-22T16:45:00Z"),
      });
      server.create("task", {
        id: "aJ5mW2cN6vF8xK9q",
        title: "Design system documentation",
        description:
          "Create comprehensive documentation for the new component library",
        status: "TODO",
        priority: "LOW",
        createdAt: new Date("2026-08-23T08:00:00Z"),
        updatedAt: new Date("2026-08-23T08:00:00Z"),
      });
    },

    routes() {
      this.urlPrefix = import.meta.env.VITE_CLIENT_BASE_URL;
      this.namespace = "api";

      this.get("/tasks", (schema) => {
        return schema.all("task");
      });
    },
  });
}
