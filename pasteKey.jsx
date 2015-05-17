//quickKeyframePaste
//version 3.0
//2015 05.17 14:28
//copyright (c) songz meng

aI = app.project.activeItem

sL = aI.selectedLayers //Layer array

cti = aI.time // CTI

A = new Array()

B = new Array()

for (l = 0; l < sL.length; l++) {

	sp = sL[l].selectedProperties //selected property array

	for (i = 0; i < sp.length; i++) {

		if (sp[i].toString() == "[object Property]") {

			j = i

			ssp = sp[j] //single select property

			keys = ssp.selectedKeys // keys array

			fk = keys[0] //first key index

			kt = ssp.keyTime(fk)

			A.push(kt)

			layerMin = Math.min.apply(Math, A)

			B.push(layerMin)

		}
	}
}

globalMin = Math.min.apply(Math, B)

ot = cti - globalMin //offset time  

app.beginUndoGroup("paste key");

for (p = 0; p < sL.length; p++) {

	psp = sL[p].selectedProperties //selected property array

	for (o = 0; o < psp.length; o++) {

		if (psp[o].toString() == "[object Property]") {

			x = o

			zsp = psp[x] //single select property

			zkeys = zsp.selectedKeys

			try {

				for (c = 0; c < zkeys.length; c++) { //keys loop

					zkt = zsp.keyTime(zkeys[c]) //keys time

					zsp.setValueAtTime(zkt + ot, zsp.keyValue(zkeys[c])) //paste key

				}
				
			} catch (err) {

				alert("已忽略图表类关键帧，请手动复制", "注意")

			}
		}
	}
}

app.endUndoGroup();
