import {Worker} from 'bullmq';
import {connection} from './queue.js';

const worker = new Worker(
    "emails",
    async (job) => {
        console.log("Processing email job...", job.id, job.name, job.data);
    },
    await new Promise((resolve) => setTimeout(resolve, 1500)),
    { connection }
);

worker.on("completed", (job) => {
    console.log(`Job with id ${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
    console.log(`Job with id ${job.id} has failed with error ${err.message}`);
});