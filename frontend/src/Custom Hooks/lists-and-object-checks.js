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
  const xProps = Object.getOwnPropertyNames(x);
  const yProps = Object.getOwnPropertyNames(y);
  
  if (xProps.length !== yProps.length) {
    return false;
  }

  for(let i = 0; i < xProps.length; i++) {
    const propName = xProps[i];
    
    if (x[propName] !== y[propName]) {
      return false;
    }
  }

  return true;
}

export function areArraysSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  for (let i = 0; i < arr1.length; i++) {
    const val1 = arr1[i];
    const val2 = arr2[i];
    
    const areObjects = typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null;
    const areArrays = Array.isArray(val1) && Array.isArray(val2);
    
    if (areObjects && !areArrays && !objectsAreSame(val1, val2)) return false;
    if (areArrays && !areArraysSame(val1, val2)) return false;
    if (!areObjects && val1 !== val2) return false;
  }
  
  return true;
}

// Function to compare two arrays
export function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

export function convertDateForSql(dateString) {
  // Split the date string by '-'
  const dateParts = dateString.split('-');

  // Extract the year, month, and day
  const year = dateParts[0];
  const month = new Date(dateParts[1] + '-1-1').getMonth() + 1; // Get month index (0-11) and convert to month number (1-12)
  const day = dateParts[2];

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;

  return formattedDate;
};