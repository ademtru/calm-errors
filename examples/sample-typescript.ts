// This is a sample TypeScript file to test CalmErrors
// It contains various common errors that the extension should explain

// ERROR 1: Null/Undefined Reference (TS2531)
function getUserName(user: { name: string } | null) {
  // This will show: "You're trying to use something that might not exist yet"
  return user.name.toUpperCase(); // Error: user might be null
}

// ERROR 2: Type Mismatch (TS2322)
function processAge() {
  const age: number = "25"; // Error: string assigned to number
  return age;
}

// ERROR 3: Undeclared Identifier (TS2304)
function calculateTotal() {
  // This will show: "TypeScript can't find this name"
  return unknownVariable * 2; // Error: unknownVariable not defined
}

// ERROR 4: Missing Import (TS2307)
// This will show: "Can't find this module"
import { SomeComponent } from './nonexistent-file'; // Error: module not found

// ERROR 5: Type Mismatch - Property doesn't exist (TS2339)
interface User {
  name: string;
  age: number;
}

function getUserEmail(user: User) {
  // This will show: "The types don't match up here"
  return user.email; // Error: email doesn't exist on User
}

// ERROR 6: Async/Promise Issue (TS2794)
function fetchData() {
  return Promise.resolve({ data: 'test' });
}

function processData() {
  // This will show: "Promise handling issue"
  const result = fetchData(); // Should use await
  return result.data; // Error: result is a Promise, not the data
}

// CORRECT EXAMPLES (for comparison)

// Fixed: Null check
function getUserNameFixed(user: { name: string } | null) {
  if (user !== null) {
    return user.name.toUpperCase();
  }
  return 'Unknown';
}

// Fixed: Correct type
function processAgeFixed() {
  const age: number = 25; // Correct: number assigned to number
  return age;
}

// Fixed: Async/await
async function processDataFixed() {
  const result = await fetchData(); // Correctly awaited
  return result.data;
}

export {};
