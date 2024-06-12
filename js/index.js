  var htmlEditor, cssEditor, jsEditor;

    // Load Monaco Editor
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/vs' }});
    require(['vs/editor/editor.main'], function () {
        // Initialize Monaco editor for HTML
        htmlEditor = monaco.editor.create(document.getElementById('html-code'), {
            language: 'html',
            theme: 'vs-dark',
            automaticLayout: true,
            wordBasedSuggestions: false,
            suggest: {
                snippetsPreventQuickSuggestions: false,
                snippets: true,
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
            }
        });

        // Initialize Monaco editor for CSS
        cssEditor = monaco.editor.create(document.getElementById('css-code'), {
            language: 'css',
            theme: 'vs-dark',
            automaticLayout: true,
            wordBasedSuggestions: false,
            suggest: {
                snippetsPreventQuickSuggestions: false,
                snippets: true,
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
            }
        });

        // Initialize Monaco editor for JavaScript
        jsEditor = monaco.editor.create(document.getElementById('js-code'), {
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            wordBasedSuggestions: false,
            suggest: {
                snippetsPreventQuickSuggestions: false,
                snippets: true,
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
            }
        });

        // Function to update live preview
        function updateLivePreview() {
            const htmlCode = htmlEditor.getValue();
            const cssCode = cssEditor.getValue();
            const jsCode = jsEditor.getValue();

            const output = document.getElementById('output').contentWindow.document;
            output.open();
            output.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>${jsCode}<\/script>
                </body>
                </html>
            `);
            output.close();
        }

        // Update live preview when editors change
        htmlEditor.onDidChangeModelContent(updateLivePreview);
        cssEditor.onDidChangeModelContent(updateLivePreview);
        jsEditor.onDidChangeModelContent(updateLivePreview);

        // Save code to localStorage when editors change
        htmlEditor.onDidChangeModelContent(saveCodeToLocalStorage);
        cssEditor.onDidChangeModelContent(saveCodeToLocalStorage);
        jsEditor.onDidChangeModelContent(saveCodeToLocalStorage);

        // Load code from localStorage on page load
        loadCodeFromLocalStorage();

        // Function to save code to localStorage
        function saveCodeToLocalStorage() {
            localStorage.setItem('htmlCode', htmlEditor.getValue());
            localStorage.setItem('cssCode', cssEditor.getValue());
            localStorage.setItem('jsCode', jsEditor.getValue());
        }

        // Function to load code from localStorage
        function loadCodeFromLocalStorage() {
            var savedHtmlCode = localStorage.getItem('htmlCode');
            var savedCssCode = localStorage.getItem('cssCode');
            var savedJsCode = localStorage.getItem('jsCode');

            if (savedHtmlCode !== null) {
                htmlEditor.setValue(savedHtmlCode);
            }
            if (savedCssCode !== null) {
                cssEditor.setValue(savedCssCode);
            }
            if (savedJsCode !== null) {
                jsEditor.setValue(savedJsCode);
            }
        }
    });
    

    function exportProject() {
    var htmlContent = htmlEditor.getValue();
    var cssContent = cssEditor.getValue();
    var jsContent = jsEditor.getValue();

    // Create a new JSZip instance
    var zip = new JSZip();

    // Add each file to the zip folder
    zip.file("index.html", htmlContent);
    zip.file("styles.css", cssContent);
    zip.file("scripts.js", jsContent);

    // Generate the zip file asynchronously
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // Use FileSaver.js to save the zip file
            saveAs(content, "project.zip");
        });
}


    function openFile(type) {
        document.getElementById('html-section').style.display = 'none';
        document.getElementById('css-section').style.display = 'none';
        document.getElementById('js-section').style.display = 'none';

        if (type === 'html') {
            document.getElementById('html-section').style.display = 'block';
        } else if (type === 'css') {
            document.getElementById('css-section').style.display = 'block';
        } else if (type === 'js') {
            document.getElementById('js-section').style.display = 'block';
        }
    }

    // Open index.html by default
    openFile('html');