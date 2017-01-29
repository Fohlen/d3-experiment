d3-experiment
=============================================

d3-experiment uses the great sauertracker API by Origin.

# Set up
You need the following tools to get started:

- Node.js possible > 6.9.1
- `npm` of course.
- MongoDB

Once you've cloned the repository hit `npm install` which will do the work for you.

# Configuration
The `config.json` currently includes one line that is supplied as the [connection string](https://docs.mongodb.com/manual/reference/connection-string/).

# Aggregate data
You can aggregate the data using `node aggregate.js` which will start mining the data from 1 to infinity.
For improved debugging you can use the `NODE_DEBUG=aggregate node aggregate.js` flag as well.

## Issues with the API
I've stumbled upon some issues in the API, which is why forever is beeing used to go on mining the data as necessary.
For that reason I use forever to keep running until `limit`, which will push empty objects for not existent games.
Use with `NODE_DEBUG=aggregate forever runner.js` in case you have `forever` installed globally. Otherwise you can do the following: `npm install forever && NODE_DEBUG=aggregate ./node_modules/.bin/forever node aggregate.js`

# Visualize the data
Fire up the server with `node server.js` which will tell you where to go.
D3.js and [datamaps](https://datamaps.github.io/) are used. ~~You can switch the different cards with the sidebar.~~
