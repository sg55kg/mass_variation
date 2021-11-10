
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



