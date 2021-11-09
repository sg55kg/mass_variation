
var testFile = File([ '~/Desktop/Workspace/mass_variation/Videos/' ])
var fileArr = [testFile.fsName]
//var createTestBin = app.project.rootItem.createBin('Test Bin')
var testBin = app.project.rootItem
$.writeln(testBin.name)

//app.project.importFiles(fileArr, true, app.project.getInsertionBin(), false)
//app.project.importFiles(fileArr, true, testBin, false)
//app.project.importFiles(fileArr, true, testBin, false)

function getNewArr() {
    var newArr = []
    for(var i = 0; i < testBin.children[0].length; i++) {
        $.writeln('for loop test')
        $.writeln(testBin.children[0][i])
        newArr.push(testBin.children[0][i])
    }
    return newArr
}

getNewArr();
$.writeln(newArr)
//$.writeln(testBin.children[0].toString())

var arr = testBin.children
app.project.createNewSequenceFromClips('Test Sequence', newArr)









////////// Reference Code ////////////

//projectName = app.project.name
//$.writeln(projectName)

// importFiles = function () {
// 		var filterString = "";
// 		if (Folder.fs === 'Windows') {
// 			filterString = "All files:*.*";
// 		}
// 		if (app.project) {
// 			var fileOrFilesToImport = File.openDialog(	"Choose files to import", // title
// 														filterString, // filter available files?
// 														true); // allow multiple?
// 			if (fileOrFilesToImport) {
// 				// We have an array of File objects; importFiles() takes an array of paths.
//                 for(var i = 0; i < fileOrFilesToImport.length; i++) {
//                     $.writeln(fileOrFilesToImport[i] + typeof(fileOrFilesToImport[i]));
//                 }
// 				var importThese = [];
// 				if (importThese) {
// 					for (var i = 0; i < fileOrFilesToImport.length; i++) {
// 						importThese[i] = fileOrFilesToImport[i].fsName;
//                         $.writeln(importThese[i])
// 					}
// 					var suppressWarnings 	= true;
// 					var importAsStills		= false;
// 					app.project.importFiles(importThese,
// 											suppressWarnings,
// 											app.project.getInsertionBin(),
// 											importAsStills);
// 				}
// 			} else {
// 				$._PPP_.updateEventPanel("No files to import.");
// 			}
// 		}
// 	}

