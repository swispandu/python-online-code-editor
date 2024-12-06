import './style.css';
import { initializeEditor } from './editor';
import { initializePyodide, runPythonCode } from './python-runner';
import { createUI } from './ui';
import { showLoading, hideLoading, enableRunButton } from './loading';

async function setupEventListeners(editor) {
  const runButton = document.getElementById('runButton');
  const outputElement = document.getElementById('output');

  runButton.addEventListener('click', async () => {
    try {
      runButton.disabled = true;
      outputElement.textContent = 'Running...\n';
      const code = editor.state.doc.toString();
      await runPythonCode(code);
    } catch (error) {
      outputElement.textContent = `Error: ${error.message}`;
    } finally {
      runButton.disabled = false;
    }
  });
}

async function initialize() {
  try {
    // Set up UI first
    document.querySelector('#app').innerHTML = createUI();
    showLoading();

    // Initialize Pyodide
    await initializePyodide();
    console.log('Pyodide initialized');

    // Initialize editor
    const editor = await initializeEditor();
    console.log('Editor initialized');

    // Set up event listeners
    await setupEventListeners(editor);
    console.log('Event listeners set up');

    // Show editor and enable run button
    hideLoading();
    enableRunButton();
    console.log('Initialization complete');
  } catch (error) {
    console.error('Initialization error:', error);
    const outputElement = document.getElementById('output');
    if (outputElement) {
      outputElement.textContent = `Failed to initialize: ${error.message}`;
    }
    hideLoading();
  }
}

// Initialize immediately since we're using the script tag at the end of body
initialize();