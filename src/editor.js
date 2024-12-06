import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { editorExtensions, defaultCode } from './editor-config';

export async function initializeEditor() {
  const startState = EditorState.create({
    doc: defaultCode,
    extensions: [
      basicSetup,
      ...editorExtensions
    ]
  });

  const editor = new EditorView({
    state: startState,
    parent: document.getElementById('editor')
  });

  return editor;
}