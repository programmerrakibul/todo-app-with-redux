import { nanoid } from "@reduxjs/toolkit";
import { createServer, Model } from "miragejs";

interface IServerProps {
  environment?: "development" | "test" | "production";
}

export default function makeServer({
  environment = "development",
}: IServerProps) {
  return createServer({
    models: {
      task: Model,
    },

    environment,

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

      server.create("task", {
        id: "uC8dX5fN2mK6yW9v",
        title: "User feedback survey",
        description:
          "Design and implement a feedback survey for the latest feature release",
        status: "TODO",
        priority: "MEDIUM",
        createdAt: new Date("2026-08-24T15:45:00Z"),
        updatedAt: new Date("2026-08-24T15:45:00Z"),
      });

      server.create("task", {
        id: "zE1bV9gH4tL7pR3s",
        title: "Database optimization",
        description:
          "Optimize slow queries and add necessary indexes for better performance",
        status: "IN_PROGRESS",
        priority: "HIGH",
        createdAt: new Date("2026-08-21T13:20:00Z"),
        updatedAt: new Date("2026-08-24T10:30:00Z"),
      });

      server.create("task", {
        id: "mK4nR7qT2xV9pL5w",
        title: "Email notification system",
        description:
          "Implement email notifications for task assignments and status updates",
        status: "TODO",
        priority: "MEDIUM",
        createdAt: new Date("2026-08-25T09:00:00Z"),
        updatedAt: new Date("2026-08-25T09:00:00Z"),
      });

      server.create("task", {
        id: "bS3cF8yJ6dM1vX7h",
        title: "API rate limiting",
        description:
          "Add rate limiting middleware to prevent API abuse and ensure fair usage",
        status: "IN_PROGRESS",
        priority: "HIGH",
        createdAt: new Date("2026-08-22T10:15:00Z"),
        updatedAt: new Date("2026-08-24T17:20:00Z"),
      });

      server.create("task", {
        id: "pL9wG5nH2rT8vK4m",
        title: "Dark mode implementation",
        description: "Add dark theme support across all pages and components",
        status: "DONE",
        priority: "LOW",
        createdAt: new Date("2026-08-19T14:30:00Z"),
        updatedAt: new Date("2026-08-23T11:45:00Z"),
      });

      server.create("task", {
        id: "qD7fV3xR9bN6yW2c",
        title: "Performance monitoring dashboard",
        description:
          "Create a real-time dashboard to monitor application performance metrics",
        status: "TODO",
        priority: "HIGH",
        createdAt: new Date("2026-08-24T16:00:00Z"),
        updatedAt: new Date("2026-08-24T16:00:00Z"),
      });

      server.create("task", {
        id: "eT2mZ8cK5pL4jB1n",
        title: "Unit test coverage",
        description:
          "Increase test coverage to 80% by writing tests for critical business logic",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        createdAt: new Date("2026-08-20T08:45:00Z"),
        updatedAt: new Date("2026-08-24T12:30:00Z"),
      });
    },

    routes() {
      this.urlPrefix = import.meta.env.VITE_CLIENT_BASE_URL;
      this.namespace = "api";

      this.get("/tasks", (schema) => {
        return schema.all("task").models;
      });

      this.post("/tasks", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        Object.assign(attrs, {
          id: nanoid(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return schema.create("task", attrs);
      });

      this.put("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        Object.assign(attrs, {
          updatedAt: new Date(),
        });

        schema.find("task", id)?.update(attrs);
        return schema.find("task", id);
      });

      this.patch("/tasks/:id/status", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        Object.assign(attrs, {
          updatedAt: new Date(),
        });

        schema.find("task", id)?.update(attrs);
        return schema.find("task", id);
      });

      this.patch("/tasks/:id/priority", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        Object.assign(attrs, {
          updatedAt: new Date(),
        });

        schema.find("task", id)?.update(attrs);
        return schema.find("task", id);
      });

      this.delete("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        schema.find("task", id)?.destroy();
        return schema.all("task").models;
      });
    },
  });
}
