const LoginWithTwitter = require("login-with-twitter");

function installTwitterAuthPlugin(Vue, options) {
  /* eslint-disable */
  //set config
  // let TwitterAuthConfig = null;
  let TwitterAuthDefaultConfig = {
    // scope: "profile email",
    // discoveryDocs: [
    //   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
    // ]
  };
  // let prompt = "select_account";
  if (typeof options !== "object") {
    console.error("invalid option type. Object type accepted only");
    return;
  }

  TwitterAuthConfig = Object.assign(TwitterAuthDefaultConfig, options);
  // if (options.scope) TwitterAuthConfig.scope = options.scope;
  // if (options.prompt) prompt = options.prompt;
  if (!options.consumerKey) {
    console.error("consumerKey is required");
    return;
  }
  if (!options.consumerSecret) {
    console.error("consumerSecret is required");
    return;
  }
  if (!options.callbackUrl) {
    console.error("callbackUrl is required");
    return;
  }

  const twitterAuth = new LoginWithTwitter({
    consumerKey: options.consumerKey,
    consumerSecret: options.consumerSecret,
    callbackUrl: options.callbackUrl
  });

  //Install Vue plugin
  Vue.twitterAuth = twitterAuth;
  Object.defineProperties(Vue.prototype, {
    $twitterAuth: {
      get: function() {
        return Vue.twitterAuth;
      }
    }
  });
}

export default installTwitterAuthPlugin;
