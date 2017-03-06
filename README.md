# Part 3

Awesome work so far!  Now its time to see if we can read the `.git/config` file so that we can configure the github api to clone/merge from the repo. 

Some big changes here from part 2:



# Exercise

* Create GithubApi.js 
  * Set it up so that you can re-use calls to github without having to set the headers each time.
  * a nice api would be something like `github.get('/users/:user')`
  