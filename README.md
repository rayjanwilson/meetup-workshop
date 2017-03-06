# Part 3

Awesome work so far!  Now its time to see if we can read the `.git/config` file so that we can configure the github api to clone/merge from the repo. 

Some big changes here from part 2:
 * introduction of store to control application state
 * more prompts added
 * menu selection added 

# Exercise

* Complete function `getConfig` 
  * Retrieve the url under `[remote "origin"]`
  * Get the user name and the owner name
  * Resolve the promise with a shape that matches `{ owner, repo}`
  