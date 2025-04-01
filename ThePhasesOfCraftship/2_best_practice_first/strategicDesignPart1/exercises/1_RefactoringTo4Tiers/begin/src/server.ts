import express, { Application as ExpressApp } from "express";
import { Server as HttpServer } from "http";

import { AssignmentsController } from "./controllers/assignmentsController";
import { ClassesController } from "./controllers/classesController";
import { StudentsController } from "./controllers/studentsController";

/**
 * Explanation of SIGINT, SIGTERM, and "gracefully":
1. SIGINT:
- What it is: SIGINT (Signal Interrupt) is a signal sent to a process to interrupt its execution. It is typically triggered by the user pressing Ctrl+C in the terminal.
- Purpose: It allows the user to stop a running process manually. When a process receives this signal, it can handle it (e.g., clean up resources) or terminate immediately.

2. SIGTERM:
- What it is: SIGTERM (Signal Terminate) is a signal sent to a process to request its termination. Unlike SIGINT, it is usually sent programmatically by other processes, such as a process manager (e.g., Docker, Kubernetes, or systemd).
- Purpose: It provides a way to terminate a process in a controlled manner. Processes can handle this signal to perform cleanup tasks before shutting down.

3. Gracefully:
- What it means: Graceful shutdown refers to the process of stopping a server or application in a controlled and orderly way. Instead of abruptly terminating the process, the application:
	Stops accepting new requests or connections.
	Waits for ongoing tasks or connections to complete.
	Cleans up resources (e.g., closing database connections, releasing file handles).
	Exits with a proper status code to indicate success or failure.
- Why it's important: Graceful shutdown prevents issues like data corruption, incomplete transactions, or resource leaks, ensuring the application exits cleanly and predictably.


How it applies to the code:
- The enableGracefulShutdown method listens for SIGINT and SIGTERM signals.
- When one of these signals is received, the gracefulShutdown function is executed:
	- It logs a message indicating the shutdown process has started.
	- It stops the HTTP server from accepting new connections and waits for existing ones to finish.
	- If the server doesn't close within 10 seconds, it forcefully exits with an error message.
- This ensures the server shuts down "gracefully" by cleaning up resources and completing tasks before exiting.
 */
export class Server {
	private readonly _instance: ExpressApp;

	constructor(
		private readonly assignmentsController: AssignmentsController,
		private readonly classesController: ClassesController,
		private readonly studentsController: StudentsController
	) {
		this._instance = express();
		this.addMiddlewares();
		this.registerRouters();
	}

	private addMiddlewares() {
		const cors = require('cors');
		this._instance.use(express.json());
		this._instance.use(cors);
	}

	private registerRouters() {
		this._instance.use('/students', this.studentsController.getRouter());
		this._instance.use('/classes', this.classesController.getRouter());
		this._instance.use('/assignments', this.assignmentsController.getRouter());
	}

	private enableGracefulShutdown(httpServer: HttpServer): void {
    const gracefulShutdown = () => {
      console.log("Received kill signal, shutting down gracefully");
      httpServer.close(() => {
        console.log("Closed out remaining connections");
        process.exit(0);
      });
  
      setTimeout(() => {
        console.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 10000);
    };
  
    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  }

	public start(port: number) {
		const server = this._instance.listen(port, () =>
			console.log(`Listening on port ${port}`)
		);
		this.enableGracefulShutdown(server);
	}
}