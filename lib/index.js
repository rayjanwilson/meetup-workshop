#!/usr/bin/env node

const assert = require('assert')
const { prompt } = require('inquirer')
const { resolve: resolvePath } = require('path')
const gitConfig = require('git-config')
const spawn = require('cross-spawn')
const GithubApi = require('./GithubApi')

const store = {}

getConfig()
  .then(addToStore('config'))
  .then(getCredentials)
  .then(configureApi)
  .then(addToStore('github'))
  .then(getPullRequests)
  .then(exitIfNoPullRequests)
  .then(showPullRequestMenu)
  .catch(console.error)

function getConfig () {
  const configPath = resolvePath(process.cwd(), '.git/config')
  return new Promise((resolve, reject) =>
    // Implmenet gitconfig here
    resolve({owner: 'JohnDoe', repo: 'AwesomeRepo'})
  )
}

function getCredentials () {
  const loginForm = [{
    name: 'user',
    type: 'input',
    message: 'Github Username:',
    default: store.config.owner
  },{
    name: 'pass',
    type: 'password',
    message: `Github Password:`
  }]
  return prompt(loginForm)
}

function configureApi ({user, pass}) {
  return GithubApi({
    auth: `${user}:${pass}`,
    headers: { 'User-Agent': 'Matt McFarland <contact@mattmcfarland.com>' }
  })
}

function getPullRequests (github) {
  const { owner, repo } = store.config
  return github.get(`/repos/${owner}/${repo}/pulls`)
}

function exitIfNoPullRequests (pullRequests) {
  if (pullRequests.length < 1) {
    console.log('No pull requests found. Exiting')
    process.exit(0)
  }
  return pullRequests
}

function showPullRequestMenu (pullRequests) {
  const choices = pullRequests.map((pr, index) => ({
    name: `(${pr.number}) ${pr.user.login}: "${pr.title}"`,
    short: pr.title,
    value: index
  }))
  choices.push({
    name: 'cancel',
    value: -1
  })
  return prompt([{
    name: 'requestSelection',
    type: 'list',
    message: 'Select a pull request',
    choices,
    filter: (val) => pullRequests[val] || val
  }])
}


function plog (promiseObject) {
  console.log(promiseObject)
  return promiseObject
}

function addToStore (keyName) {
  return value => {
    store[keyName] = value
    return value
  }
}
