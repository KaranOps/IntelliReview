# IntelliReview Test Suite

This document contains the test cases used to demonstrate the capabilities of the IntelliReview Code Review Assistant. Each case targets a specific category of error (Bugs, Security, Performance, Memory) across different supported languages.

---

## 1. Python: The "Infinite Loop"

**Category:** Bug  
**Scenario:** A countdown function that fails to decrement the counter, causing the loop to run forever.

```python
def countdown(n):
    print("Starting countdown...")
    while n > 0:
        print(n)
        # Bug: I forgot 'n = n - 1', so this runs forever
    print("Blast off!")
```

---

## 2. JavaScript: The "Hardcoded Secret"

**Category:** Security  
**Scenario:** A function that improperly exposes a sensitive API key directly in the source code.

```javascript
function fetchUserData() {
    // Security Risk: Never commit API keys to code
    const apiKey = "sk-proj-12345-SECRET-KEY"; 
    
    fetch("https://api.example.com/data?key=" + apiKey)
        .then(res => res.json())
        .then(data => console.log(data));
}
```

---

## 3. Java: The "Performance Killer"

**Category:** Performance  
**Scenario:** A function that uses string concatenation inside a large loop, which creates unnecessary memory overhead. The AI should suggest using StringBuilder.

```java
public class StringJoiner {
    public String makeBigString() {
        String result = "";
        // Performance Issue: Using String concatenation in a loop is slow.
        // The AI should suggest using 'StringBuilder' instead.
        for (int i = 0; i < 10000; i++) {
            result += " " + i;
        }
        return result;
    }
}
```

---

## 4. C++: The "Memory Leak"

**Category:** Memory Management  
**Scenario:** A function that manually allocates memory using new but fails to release it using delete, leading to a memory leak.

```cpp
void processArray() {
    // Bug: Memory Leak
    // I used 'new' to allocate memory...
    int* myNumbers = new int[100];
    
    myNumbers[0] = 5;
    
    // ...but I forgot to write 'delete[] myNumbers;'
}
```