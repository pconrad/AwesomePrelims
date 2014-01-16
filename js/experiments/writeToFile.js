
function writeToFile(content, filename) {

window.alert("tring to write " + content + " to " + filename);  

window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {

  // fs.root is a DirectoryEntry object.
  fs.root.getFile(filename, {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(writer) {  // writer is a FileWriter object.

        writer.onwrite = function(e) { alert(e) };
        writer.onerror = function(e) { alert(e) };

        var bb = new BlobBuilder();
        bb.append(content);

        writer.write(bb.getBlob('text/plain'));

    }, opt_errorHandler);
  }, opt_errorHandler);
});

}





