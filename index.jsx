
projectName = app.project.name
testFile = new File([ '~/Desktop/Workspace/mass_variation/IMG_5938.MOV' ])
fileArr = [testFile.fsName]
testBin = app.project.rootItem.children

app.project.importFiles(fileArr, true, app.project.getInsertionBin(), false)
$.writeln('trying')

$.writeln(projectName)




