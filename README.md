# Part 1

We now have inquirer and node https setup and are connecting to github!  

* Because we'll be using a lot of asynchronous code we're going to chain promises
* We also will be hitting the API more than once, so it would be nice to make it more generic and reusable.

# Exercise

* Create GithubApi.js 
  * Set it up so that you can re-use calls to github without having to set the headers each time.
  * a nice api would be something like `github.get('/users/:user')`
  