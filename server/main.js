import express from 'express'
import { createServer } from 'http'
import { DbConnection } from './db/DbConfig'
import { socketProvider } from './SocketProvider'
import { Startup } from './Startup'
import { logger } from './utils/Logger'

// create server & socketServer
const app = express()
const port = process.env.PORT || 3000

const httpServer = createServer(app)
Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)

// Establish Socket
socketProvider.initialize(httpServer)

// Connect to Atlas MongoDB
DbConnection.connect()

// Start Server
httpServer.listen(port, () => {
  logger.log(`[SERVING ON PORT: ${port}]`)
})
























//AUTH0 RULE
/**
 * Add common namespaced properties to userInfo,
 * note auth0 will strip any non namespaced properties
 */
 function extendUserInfo(user, context, callback) {
  // const namespace = 'https://codeworks-demos.us.auth0.com';
  context.idToken = context.idToken || {};
  context.authorization = context.authorization || {};
  user.app_metadata = user.app_metadata || { };
  user.app_metadata.new = user.app_metadata.id ? false : true;
  user.app_metadata.id = user.app_metadata.id || generateId();

  for (const key in user.app_metadata) {
      context.idToken[`${key}`] = user.app_metadata[key];
  }
  context.idToken[`roles`] = context.authorization.roles;
  context.idToken[`permissions`] = context.authorization.permissions;
  context.idToken[`user_metadata`] = user.user_metadata;

  if(!user.app_metadata.new){
      return callback(null, user, context);
  }
  delete user.app_metadata.new;
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
      .then(function () {
          callback(null, user, context);
      })
      .catch(function (err) {
          callback(err);
      });

function generateId() {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (
    Math.random() * 16 | 0).toString(16)).toLowerCase();
}
}

