
export function checkIfListsAreEqual(list1, list2) {
    // Convert each list to a set
    const set1 = new Set(list1);
    const set2 = new Set(list2);
    // Check if the size of both sets is the same
    if (set1.size !== set2.size) {
      return false;
    }
    // Check if every element in set1 exists in set2
    for (const element of set1) {
      if (!set2.has(element)) {
        return false;
      }
    }
    // Check if every element in set2 exists in set1
    for (const element of set2) {
      if (!set1.has(element)) {
        return false;
      }
    }
    // If both sets contain the same elements, return true
    return true;
}
  
export function isObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let i = 0; i < keys1.length; i++) {
      const key1 = keys1[i];
      const key2 = keys2[i];
  
      if (key1 !== key2 || obj1[key1] !== obj2[key2]) {
        return false;
      }
    }
    return true;
}
  
export function isObjectInArray(newObj, objectsArray) {
    for (const obj of objectsArray) {
      if (isObjectsEqual(newObj, obj)) {
        return true;
      }
    }
    return false;
}
  