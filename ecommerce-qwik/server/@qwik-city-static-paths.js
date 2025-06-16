const staticPaths = new Set(["/Fonts/Inter.woff2","/favicon.svg","/images/products/coffeemug.jpg","/images/products/headphones.jpg","/images/products/laptopbag.jpg","/images/products/runningshoes.jpg","/images/products/smartwatch.jpg","/images/products/tablelamp.jpg","/manifest.json","/q-manifest.json","/robots.txt"]);
function isStaticPath(method, url) {
  if (method.toUpperCase() !== 'GET') {
    return false;
  }
  const p = url.pathname;
  if (p.startsWith("/build/")) {
    return true;
  }
  if (p.startsWith("/assets/")) {
    return true;
  }
  if (staticPaths.has(p)) {
    return true;
  }
  if (p.endsWith('/q-data.json')) {
    const pWithoutQdata = p.replace(/\/q-data.json$/, '');
    if (staticPaths.has(pWithoutQdata + '/')) {
      return true;
    }
    if (staticPaths.has(pWithoutQdata)) {
      return true;
    }
  }
  return false;
}
export { isStaticPath };