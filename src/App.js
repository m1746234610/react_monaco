import * as monaco from 'monaco-editor'
import { useRef, useEffect } from 'react'
import { language as pythonLang } from 'monaco-editor/esm/vs/basic-languages/python/python.js'
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js'
let flag = false
let IText = null
export default function App() {
  console.log('重新加载')
  const mona = useRef(null)

  const style = {
    height: '300px',
    width: '95%',
    border: '1px solid #eee',
  }

  useEffect(() => {
    console.log(pythonLang)
    if (!flag) {
      flag = true

      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: function () {
          let suggestions = [];
          pythonLang.keywords.forEach(item => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionTriggerKind.Keyword,
              insertText: item
            })
          })

          return {
            suggestions
          }
        }
      })

      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: function () {
          let suggestions = [];
          sqlLanguage.keywords.forEach(item => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: item
            });
          })
          sqlLanguage.operators.forEach(item => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: item
            });
          })
          sqlLanguage.builtinFunctions.forEach(item => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: item
            });
          })
          sqlLanguage.builtinVariables.forEach(item => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: item
            });
          })
          return {
            suggestions: suggestions
          };
        },
      });

      IText = monaco.editor.create(mona.current, {
        value: '',
        theme: 'vs-dark',
        language: 'sql',
        automaticLayout: true, // 自适应布局
      })
    }
  }, [])

  const getValue = () => {
    console.log(IText.getValue());
  }

  const gsh = () => {

  }

  return (
    <>
      <button onClick={getValue}>获取</button>
      <button onClick={gsh}>格式化</button>
      <div ref={mona} style={style}>
        ap
      </div>
    </>
  );
}
