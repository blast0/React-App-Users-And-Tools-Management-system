/**
 * Accepted roles are ["ga", "sa", "ss"]
 * ga -> global admin
 * sa -> system admin
 * ss -> support staff
 * Add a new config in below format and put allowed roles against a perticular vid.
 * vid: ["role1","role2","role3"]
 * If a role is not included then it will be excluded from permissions.
 * If vid is added with empty array all roles will be blocked. 
 * Configuration can be added for toolbar items, routes, and HTML Fragments.
 */
const vPerms = {};

export { vPerms };
