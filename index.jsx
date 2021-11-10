
function addClipsToProject(filePath) {
    var videoFile = new File([ filePath ])
    var fileArr = [videoFile.fsName]
    var testBin = app.project.rootItem

    app.project.importFiles(fileArr, true, testBin, false)

    //app.project.importFiles(fileArr, true, app.project.getInsertionBin(), false)
    //var createTestBin = app.project.rootItem.createBin('Test Bin')
}

function createSeqFromClips(sequenceName, sequenceId) {
    var newSequence = app.project.createNewSequence(sequenceName, sequenceId)
    var selectedSequence = app.project.activeSequence

    if(selectedSequence) {
        var clipFolder = app.project.rootItem.children[0].children

        for(var i = 0; i < clipFolder.length; i++) {
            var numVTracks = newSequence.videoTracks.numTracks;
 		    var targetVTrack = newSequence.videoTracks[(numVTracks - 1)];
            var clipToInsert = clipFolder[i]

            if (targetVTrack.clips.numItems > 0) {
                var lastClip = targetVTrack.clips[(targetVTrack.clips.numItems - 1)];
                targetVTrack.insertClip(clipToInsert, lastClip.end.seconds);  
            } else {
                var timeAtZero = new Time();
                targetVTrack.insertClip(clipToInsert, timeAtZero.seconds);
            }
        }
    } else {
        $.writeln("Unable to create sequence")
    }

}

function changeSequenceSettings(editMode, frmWidth, frmHeight, prevFrmWidth, prevFrmHeight, pixelAspRatio) {
    var selectedSequence = app.project.activeSequence
    var seqSettings = selectedSequence.getSettings()

    seqSettings.editingMode = editMode
    seqSettings.videoFrameHeight = frmWidth
    seqSettings.videoFrameWidth = frmHeight
    seqSettings.previewFrameHeight = prevFrmWidth
    seqSettings.previewFrameWidth = prevFrmHeight
    seqSettings.videoPixelAspectRatio = pixelAspRatio

    selectedSequence.setSettings(seqSettings)

}

addClipsToProject('~/Desktop/Workspace/mass_variation/Videos/')
createSeqFromClips('Huge Sequence', 'coolid123')
changeSequenceSettings('35d109db-457b-43c1-9452-9cb7be9f121c', 1080, 1080, 1080, 1080, '1:1')









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

// insertOrAppend : function () {
// 		var newSequence = app.project.activeSequence;
// 		if (newSequence) {
// 			var first = app.project.rootItem.children[0];
// 			if (first) {
// 				if (!first.isSequence()){
// 					if (first.type !== ProjectItemType.BIN) {
// 						var numVTracks = newSequence.videoTracks.numTracks;
// 						var targetVTrack = newSequence.videoTracks[(numVTracks - 1)];
// 						if (targetVTrack) {
// 							// If there are already clips in this track, append this one to the end. Otherwise, insert at start time.
// 							if (targetVTrack.clips.numItems > 0) {
// 								var lastClip = targetVTrack.clips[(targetVTrack.clips.numItems - 1)];
// 								if (lastClip) {
// 									targetVTrack.insertClip(first, lastClip.end.seconds);
// 								}
// 							} else {
// 								var timeAtZero = new Time();
// 								targetVTrack.insertClip(first, timeAtZero.seconds);
// 								// New in 13.1; using the new linkSelection/unlinkSelection calls, 
// 								// panels can remove just the audio (or video) of a given clip.
// 								var newlyAddedClip = targetVTrack.clips[(targetVTrack.clips.numItems - 1)];
// 								if (newlyAddedClip) {
// 									newlyAddedClip.setSelected(true, true);
// 									newSequence.unlinkSelection();
// 									newlyAddedClip.remove(true, true);
// 									newSequence.linkSelection();
// 								}
// 							}
// 						} else {
// 							$._PPP_.updateEventPanel("Could not find first video track.");
// 						}
// 					} else {
// 						$._PPP_.updateEventPanel(first.name + " is a bin.");	
// 					}
// 				} else {
// 					$._PPP_.updateEventPanel(first.name + " is a sequence.");
// 				}
// 			} else {
// 				$._PPP_.updateEventPanel("Couldn't locate first projectItem.");
// 			}
// 		} else {
// 			$._PPP_.updateEventPanel("no active sequence.");
// 		}
// 	},

