// import data from './clip.json'

proj = app.project.activeSequence
projectName = app.project.name
//fileName : {'~/Desktop/Workspace/mass_variation/A002_C018_0922BW_002'}
file = {"filePath" : "~/Desktop/Workspace/mass_variation/A002_C018_0922BW_002"}
testBin = app.project.rootItem.children

importFiles = function () {
		var filterString = "";
		if (Folder.fs === 'Windows') {
			filterString = "All files:*.*";
		}
		if (app.project) {
			var fileOrFilesToImport = File.openDialog(	"Choose files to import", // title
														filterString, // filter available files?
														true); // allow multiple?
			if (fileOrFilesToImport) {
				// We have an array of File objects; importFiles() takes an array of paths.
                for(var i = 0; i < fileOrFilesToImport.length; i++) {
                    $.writeln(fileOrFilesToImport[i] + typeof(fileOrFilesToImport[i]));
                }
				var importThese = [];
				if (importThese) {
					for (var i = 0; i < fileOrFilesToImport.length; i++) {
						importThese[i] = fileOrFilesToImport[i].fsName;
                        $.writeln(typeof(importThese[i].fsName))
					}
					var suppressWarnings 	= true;
					var importAsStills		= false;
					app.project.importFiles(importThese,
											suppressWarnings,
											app.project.getInsertionBin(),
											importAsStills);
				}
			} else {
				$._PPP_.updateEventPanel("No files to import.");
			}
		}
	}
    // app.project.importFiles(file.filePath, true, app.project.getInsertionBin(), false)
    // $.writeln('trying')
importFiles()
// exampleVid = ImGetSourceVideo('../../IMG_5938.MOV')
$.writeln(projectName)




