/**
 * this file defines config for http call blocking
 * from axios interceptor
 */

// GET calls are generally allowed always except
// it is explicitly blocked by `deniedGetURls`
const deniedGetURls = [
  // "getDevices", 
  // "getMe"
];
// POST|PUT|PATCH|DELETE calls are generally allowed if
// it is allowed by `allowedUpdateURLS`. Otherwise blocked.
const allowedUpdateURLS = [];

export {
  deniedGetURls,
  allowedUpdateURLS
}