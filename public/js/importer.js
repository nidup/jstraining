/**
 * Doesnt make sense to import/convert the input file with javascript but it's a pretty good exercise :)
 */
function Importer() {
    this.parse = function(url, converter) {
        var response = fetch(url);
        var lines = converter.convert(response);
        return lines;
    
    };
    var fetch = function(url) {
        var xmlhttp= new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        if (xmlhttp.status !== 200) {
            console.log('File not found');
        } else {
            return xmlhttp.responseText;
        }
    }
};

function OperationConverter() {
    this.convert = function(content) {

        var txtLines = content.split(/\r\n|\n/);
        var txtLineSep = '+--------------------------------------------------------------------+';
        var operations = [];
        var currentOperation = new Operation();

        for (var lineIdx in txtLines) {
            var line = txtLines[lineIdx];
            if (line === txtLineSep) {
                if (currentOperation.isValid()) {
                    operations.push(currentOperation);
                } else {
                    console.log('WARNING : invalid operation');
                    console.log(currentOperation);
                }
                currentOperation = new Operation();
            } else {
                var toReplaceDate = line.match(/Date\s*:\s/g);
                var toReplaceDebit = line.match(/D\u00E9bit\s*\(EUR\):\s/g);
                var toReplaceCredit = line.match(/Cr\u00E9dit\s*\(EUR\):\s/g);

                if (toReplaceDate !== null) {
                    var date = line.replace(toReplaceDate[0], '').trim();
                    currentOperation.date = date;
                } else if (toReplaceDebit !== null) {
                    var amount = parseFloat(line.replace(toReplaceDebit[0], '').trim().replace(',', '.'));
                    currentOperation.amount = amount;
                    currentOperation.type = 'DEBIT';
                } else if (toReplaceCredit !== null) {
                    var amount = parseFloat(line.replace(toReplaceCredit[0], '').trim().replace(',', '.'));
                    currentOperation.amount = amount;
                    currentOperation.type = 'CREDIT';
                } else {
                    if (currentOperation.label === null) {
                        currentOperation.label = line.trim();
                    } else {
                        currentOperation.label += ' : ' + line.trim();
                    }
                }
            }
        }

        return operations;
    };
};

