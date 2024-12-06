export function createUI() {
  return `
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Python Web Editor</h1>
      
      <div id="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading Python environment...</p>
      </div>

      <div id="editor-container" class="hidden grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
        <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 class="text-xl font-semibold mb-3 text-gray-700">Code Editor</h2>
          <div id="editor" class="flex-grow border rounded-lg overflow-hidden"></div>
          <button id="runButton" disabled class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Run Code
          </button>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 class="text-xl font-semibold mb-3 text-gray-700">Output</h2>
          <pre id="output" class="flex-grow bg-gray-100 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm overflow-auto"></pre>
        </div>
      </div>
    </div>
  </div>
  `;
}