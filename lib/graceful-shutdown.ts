/*
Use createShutdownHandler to gracefully shut down an application on SIGINT or SIGTERM.
You will need to supply an array of async functions that will be called during shutdown that close down any connections etc before the process exits.
The functions will run in parallel, so any dependencies between them should be handled in the functions themselves by awaiting the previous steps.
You can also optionally supply a timeout in milliseconds after which the process will be forcefully shut down if the shutdown handlers have not completed.
The default timeout is 5 seconds.

E.g.:

async function closeDatabase() {
	return pool.close(); // either return a promise ...
}

async function closeMessageQueue() {
	await consumer.close();
	await conn.close(); ... or await the last step of the function
}

const onShutdown = createShutdownHandler([closeDatabase, closeMessageQueue], 10000);

process.on('SIGINT', onShutdown); // ctrl + c
process.on('SIGTERM', onShutdown); // 'docker stop' etc.
*/

import { consola } from 'consola';

const SHUTDOWN_TIMEOUT = 5000; // 5s

export function createShutdownHandler(procs: ShutdownFunc[], timeout: number = SHUTDOWN_TIMEOUT) {
	return async function onShutdown() {
		setTimeout(() => {
			consola.warn(`Did not shut down gracefully in ${ timeout / 1000 }s, forcefully shutting down`);
				
			process.exit(1);
		}, timeout);
			
		consola.start('Shutting down gracefully...');
	
		const settled = await Promise.allSettled(procs.map(proc => proc()));
	
		const errors = getErrors(settled);
	
		if (errors.length) {
			consola.error('Errors occurred during graceful shutdown:', ...errors);

			process.exit(1);
		}
	
		consola.success('Graceful shutdown successful');

		process.exit(0);
	};
}

type ShutdownFunc = () => Promise<void>;

function getErrors(settledPromises: Awaited<ReturnType<typeof Promise.allSettled>>) {
	return settledPromises
		.filter((res): res is {
			status: 'rejected',
			reason: unknown 
		} => res.status === 'rejected')
		.map(({ reason }) => reason);
}