#!/usr/bin/env node

const https = require('https')
const { prompt } = require('inquirer')

getCredentials()
  .then(getPullRequests)
  .then(plog)
  .catch(console.error)

function getCredentials () {
  const loginForm = [{
    name: 'user',
    type: 'input',
    message: `Github Username:`

  },{
    name: 'pass',
    type: 'password',
    message: `Github Password:`
  }]
  return prompt(loginForm)
}

function getPullRequests ({user, pass}) {
  // using api here: https://developer.github.com/v3/
    const requestOptions = {
      hostname: 'api.github.com',
      path: `/users/${user}`,
      auth: `${user}:${pass}`,
      headers: { 'User-Agent': 'Matt McFarland <contact@mattmcfarland.com>' }      
    }
    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, response => {
        if (response.statusCode !== 200) {
          reject(`Invalid reponse from github: ${response.statusCode}`)
        }
        let data = ''
        response.on('data', buffer => data += buffer)
        response.on('end', () => resolve(data))
      })
      req.on('error', reject)
      req.end()
    })
}

function plog (promiseObject) {
  console.log(promiseObject)
  return promiseObject
}

