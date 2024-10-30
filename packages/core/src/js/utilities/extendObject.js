export function extendObject(target, obj) {
  // Run init if it exists and then remove it from the object.
  if (typeof obj.init === "function") {
    obj.init();
    delete obj.init;
  }
  
  // Assign all methods to the target object.
  Object.assign(target, obj);
}
