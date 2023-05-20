export function checkIfListsAreEqual(list1, list2) {//Sees if two arrays of arrays are the same
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

function objectsAreSame(x, y) {
  for(let propertyName in x) {
    if(x[propertyName] !== y[propertyName]) {
      return false;
    }
  }
  return true;
}

export function areArraysSame(arr1, arr2) {//Sees if 2 arrays of objects are the same
  if (arr1.length !== arr2.length) return false;
  
  return arr1.every(obj1 => arr2.some(obj2 => objectsAreSame(obj1, obj2)));
}

// Function to compare two arrays
export function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
