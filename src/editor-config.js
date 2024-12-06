import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { EditorState, Compartment } from '@codemirror/state';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';

export const defaultCode = `# Welcome to the Python Web Editor!
# Type or paste your Python code here

def greet(name):
    return f"Hello, {name}!"

# Example usage
message = greet("World")
print(message)

# Try some calculations
numbers = [1, 2, 3, 4, 5]
sum_numbers = sum(numbers)
print(f"Sum of numbers: {sum_numbers}")`;

const languageConf = new Compartment();

export const editorExtensions = [
  EditorState.tabSize.of(4),
  EditorState.allowMultipleSelections.of(true),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  languageConf.of(python()),
  keymap.of([...defaultKeymap, indentWithTab]),
  EditorView.lineWrapping,
  EditorView.contentAttributes.of({
    autocomplete: 'off',
    spellcheck: 'false',
    autocorrect: 'off',
    autocapitalize: 'off'
  }),
  EditorState.phrases.of({
    "Control": "Ctrl"
  }),
  EditorView.domEventHandlers({
    beforeinput: (e, view) => {
      if (e.inputType === 'insertText') {
        e.preventDefault();
        const { from, to } = view.state.selection.main;
        view.dispatch({
          changes: { from, to, insert: e.data },
          selection: { anchor: from + 1 }
        });
        return true;
      }
      return false;
    }
  }),
  EditorView.theme({
    "&": {
      height: "100%",
      fontSize: "14px"
    },
    ".cm-content": {
      fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
      caretColor: "#fff",
      whiteSpace: "pre-wrap",
      padding: "10px 0",
      caretShape: "block"
    },
    ".cm-line": {
      padding: "0 8px",
      lineHeight: "1.6"
    },
    ".cm-cursor": {
      borderLeftColor: "#fff",
      borderLeftWidth: "2px",
      marginLeft: "-1px"
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#fff"
    },
    "&.cm-focused .cm-selectionBackground": {
      background: "#363636"
    },
    ".cm-selectionBackground": {
      background: "#363636"
    },
    ".cm-gutters": {
      backgroundColor: "#1e1e1e",
      color: "#858585",
      border: "none"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#333"
    }
  }),
  oneDark
];