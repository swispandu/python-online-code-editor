export function showLoading() {
  const loading = document.getElementById('loading');
  const editorContainer = document.getElementById('editor-container');
  if (loading && editorContainer) {
    loading.classList.remove('hidden');
    editorContainer.classList.add('hidden');
  }
}

export function hideLoading() {
  const loading = document.getElementById('loading');
  const editorContainer = document.getElementById('editor-container');
  if (loading && editorContainer) {
    loading.classList.add('hidden');
    editorContainer.classList.remove('hidden');
  }
}

export function enableRunButton() {
  const runButton = document.getElementById('runButton');
  if (runButton) {
    runButton.disabled = false;
  }
}