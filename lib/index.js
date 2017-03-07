#!/usr/bin/env node

getCredentials()
  .then(getPullRequests)
  .catch(console.error)
