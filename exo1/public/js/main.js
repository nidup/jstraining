var importer = new Importer();
var operations = importer.parse('fixtures/example/demo-utf8.txt', new OperationConverter());
console.log(operations);
