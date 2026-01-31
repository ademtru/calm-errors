// Sample Java file to test CalmErrors
// Contains common Java errors

public class SampleJava {

  // ERROR 1: NullPointerException
  public void processUser() {
    // This will show: "You're accessing something that's null"
    String user = null;
    System.out.println(user.length()); // Error: null reference
  }

  // ERROR 2: Cannot find symbol
  public void calculateTotal() {
    // This will show: "Java can't find this symbol"
    int result = unknownVariable * 2; // Error: unknownVariable not declared
  }

  // ERROR 3: Type mismatch
  public void setAge() {
    // This will show: "Type mismatch in your code"
    int age = "25"; // Error: String cannot be assigned to int
  }

  // ERROR 4: Array index out of bounds
  public void accessArray() {
    // This will show: "Array index is out of bounds"
    int[] numbers = { 1, 2, 3 };
    System.out.println(numbers[5]); // Error: index 5 doesn't exist
  }

  // ERROR 5: Missing import
  public void useArrayList() {
    // This will show: "Can't resolve this type"
    // ArrayList list = new ArrayList(); // Error: ArrayList not imported
  }

  // CORRECT EXAMPLES (for comparison)

  // Fixed: Null check
  public void processUserFixed() {
    String user = null;
    if (user != null) {
      System.out.println(user.length());
    } else {
      System.out.println("User is null");
    }
  }

  // Fixed: Correct type
  public void setAgeFixed() {
    int age = 25; // Correct: int assigned to int
  }

  // Fixed: Array bounds check
  public void accessArrayFixed() {
    int[] numbers = { 1, 2, 3 };
    int index = 5;
    if (index >= 0 && index < numbers.length) {
      System.out.println(numbers[index]);
    } else {
      System.out.println("Index out of bounds");
    }
  }
}
