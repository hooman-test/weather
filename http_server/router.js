let routes = [];

function register(method, url, fn) {
  routes.push({method, url, fn});
}

function handler(req, res) {
  let matchedRoutes = routes.filter((route) => {
    if ((route.url == req.url || route.url == null) && (route.method == req.method || route.method == null)) {
      return true;
    }
    return false;
  });
  console.log(matchedRoutes);
  matchedRoutes.some((r) => r.fn(req, res));
}

module.exports.handler = handler;
module.exports.register = register;
