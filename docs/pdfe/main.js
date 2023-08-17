document.getElementById('extractButton').addEventListener('click', function() {
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const typedarray = new Uint8Array(event.target.result);
            extractTextFromPDF(typedarray);
        };

        reader.readAsArrayBuffer(file);
    }
});

function extractTextFromPDF(pdfData) {
    pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
        const numPages = pdf.numPages;
        const textOutput = document.getElementById('textOutput');

        textOutput.innerHTML = '';

        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            pdf.getPage(pageNumber).then(function(page) {
                page.getTextContent().then(function(textContent) {
                    const pageText = textContent.items.map(function(item) {
                        return item.str;
                    }).join(' ');

                    const pageDiv = document.createElement('div');
                    pageDiv.textContent = pageText;
                    textOutput.appendChild(pageDiv);
                });
            });
        }
    });
}

