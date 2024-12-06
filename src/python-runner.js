let pyodideInstance = null;

export async function initializePyodide() {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  try {
    // Using the global loadPyodide function from the CDN
    pyodideInstance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
    });
    
    // Set up stdout capture
    pyodideInstance.setStdout({
      batched: (output) => {
        const outputElement = document.getElementById('output');
        if (outputElement) {
          outputElement.textContent += output + '\n';
        }
      }
    });
    
    return pyodideInstance;
  } catch (error) {
    console.error('Failed to initialize Pyodide:', error);
    throw error;
  }
}

export async function runPythonCode(code) {
  if (!pyodideInstance) {
    throw new Error('Pyodide not initialized');
  }

  try {
    const outputElement = document.getElementById('output');
    outputElement.textContent = ''; // Clear previous output
    
    await pyodideInstance.loadPackagesFromImports(code);
    const result = await pyodideInstance.runPythonAsync(code);
    
    // Only append the result if it's not undefined or null
    if (result !== undefined && result !== null) {
      outputElement.textContent += result + '\n';
    }
    
    return outputElement.textContent;
  } catch (error) {
    throw error;
  }
}