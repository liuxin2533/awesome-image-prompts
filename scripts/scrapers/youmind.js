#!/usr/bin/env node

const { main } = require('../ingestion/cli');

main(['ingest', '--source', 'youmind', ...process.argv.slice(2)]).catch(error => {
  console.error(error.message);
  process.exit(1);
});
