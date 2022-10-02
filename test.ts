export {};

const projectIds = [1, 2, 3];

async function main1() {
  projectIds.forEach(async (pid) => {
    console.log("starting", pid);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("done", pid);
  });
}

async function main2() {
  for await (const pid of projectIds) {
    console.log("starting", pid);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("done", pid);
  }
}

main2().catch(console.error);
