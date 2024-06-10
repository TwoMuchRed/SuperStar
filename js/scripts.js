document.addEventListener("DOMContentLoaded", function () {
    var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
        mode: "htmlmixed",
        lineNumbers: true
    });
    var cssEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
        mode: "css",
        lineNumbers: true
    });
    var jsEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
        mode: "javascript",
        lineNumbers: true
    });

    window.htmlEditor = htmlEditor;
    window.cssEditor = cssEditor;
    window.jsEditor = jsEditor;

    // Load saved code from localStorage if available
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

    // Listen for changes in editors and save to localStorage
    htmlEditor.on("change", function () {
        localStorage.setItem('htmlCode', htmlEditor.getValue());
        runCode(htmlEditor, cssEditor, jsEditor); // Auto-preview when HTML changes
    });
    cssEditor.on("change", function () {
        localStorage.setItem('cssCode', cssEditor.getValue());
        runCode(htmlEditor, cssEditor, jsEditor); // Auto-preview when CSS changes
    });
    jsEditor.on("change", function () {
        localStorage.setItem('jsCode', jsEditor.getValue());
        runCode(htmlEditor, cssEditor, jsEditor); // Auto-preview when JavaScript changes
    });

    // Open the last active file on page load
    var lastActiveFile = localStorage.getItem('lastActiveFile');
    if (lastActiveFile !== null) {
        openFile(lastActiveFile);
    }
});

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

    // Save last active file to localStorage
    localStorage.setItem('lastActiveFile', type);
}



function runCode(htmlEditor, cssEditor, jsEditor) {
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

    // Save generated HTML content to localStorage
    localStorage.setItem('livePreview', output.documentElement.outerHTML);
}

document.addEventListener("DOMContentLoaded", function () {
    // Load live preview from localStorage if available
    var savedLivePreview = localStorage.getItem('livePreview');
    if (savedLivePreview !== null) {
        document.getElementById('output').contentWindow.document.write(savedLivePreview);
    }

    var htmlEditor = ace.edit("html-code");
    htmlEditor.setTheme("ace/theme/twilight");
    htmlEditor.session.setMode("ace/mode/html");

    var cssEditor = ace.edit("css-code");
    cssEditor.setTheme("ace/theme/twilight");
    cssEditor.session.setMode("ace/mode/css");

    var jsEditor = ace.edit("js-code");
    jsEditor.setTheme("ace/theme/twilight");
    jsEditor.session.setMode("ace/mode/javascript");

    window.htmlEditor = htmlEditor;
    window.cssEditor = cssEditor;
    window.jsEditor = jsEditor;

    // Load saved code from localStorage if available
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

    // Listen for changes in editors and save to localStorage
    htmlEditor.getSession().on('change', function () {
        localStorage.setItem('htmlCode', htmlEditor.getValue());
        runCode(htmlEditor, cssEditor, jsEditor); // Auto-preview when HTML changes
    });
    cssEditor.getSession().on('change', function () {
        localStorage.setItem('cssCode', cssEditor.getValue());
        runCode(htmlEditor, cssEditor, jsEditor); // Auto-preview when CSS changes
    });
    jsEditor.getSession().on('change', function () {
        localStorage.setItem('jsCode', jsEditor.getValue());
        runCode(htmlEditor, cssEditor, jsEditor); // Auto-preview when JavaScript changes
    });

    // Open the last active file on page load
    var lastActiveFile = localStorage.getItem('lastActiveFile');
    if (lastActiveFile !== null) {
        openFile(lastActiveFile);
    }
});

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

    // Save last active file to localStorage
    localStorage.setItem('lastActiveFile', type);
}
