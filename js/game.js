// For Save Fuckery, and general whatnot.
var VERSION = 0.4;

// Initializers
var resources = [0, 0, 0,    // Stone, Gloop, Fumes
				 0, 0, 0,    // Ore, Oil, Gas
				 0, 0, 0,    // Paste, Foam, Gel
				 0, 0, 0, ]; // Unobtanium, Tachyons, Antimatter
				 
var resourceNames = [	"Stone", 		"Gloop", 	"Fumes",
						"Paste",		"Foam",		"Gel",
						"Ore",			"Oil",		"Gas",
						"Unobtanium",	"Tachyons",	"Antimatter" ];
				 
var buildings = [0, 0, 0, 0, 		// Robut, Miner, Pumper, Fracker
				 0, 0, 0, 0,		// Grinder, Compressor, Bubbler, crystallizer
				 0, 0, 0, 0,		// distiller, vaporizer, tachynet, equalizer
				];				
var upgrades = [0, 0, 0, 0, 	// CPU, 		magdrill, 		condenser, 		vacpump
				0, 0, 0, 0,		// Detector, 	Hydrometer, 	Colorimeter, 	physlab
				0, 0, 0, 0,		// chemlab, 	chronolab, 		instaminer, 	filterpump
				0, 0, 			// fumigator,	nukelab
				];
				
var MAXBUILDINGS = 12;
var MAXUPGRADES = 14;
var MAXRESOURCES = 12;

var notifications = [
						[false, false],		// Tachyons
						[false, false],		// Antimatter
					];
					
var notTypes = 	[
					"tachyon",
					"antimatter",
				];
				
var notDesc = 	[
					"Excess tachyons causing unstable time distortion!",
					"Antimatter reacting with other elements!",
				];
						

var counters = [10, 4, 4, 4, 		// Robut, Miner, Pumper, Fracker
				 1, 1, 1, 1, 		// Grinder, Compressor, Bubbler, crystallizer
				 1,	1, 1, 1,		// Distiller, vaporizer, tachynet, equalizer
				]; 
var countmax = [10, 4, 4, 4,	    // Robut, Miner, Pumper, Fracker
				 1, 1, 1, 1,		// Grinder, Compressor, Bubbler, crystallizer
				 1,	1, 1, 1,		// Distiller, vaporizer, tachynet, equalizer
				];	
				
var curTimeout = 500;
var baseTimeout = 500;

var canhasbuildings = [	true, true, true, true,  		// Robut, Miner, Pumper, Fracker
						false, false, false, false,		// Compressor, Grinder, Bubbler, crystallizer
						false, false, false, false,		// distiller, vaporizer, tachynet, equalizer
						];
						
var canhasupgrades  = [	true, true, true, true, 		// CPU, magdrill, condenser, vacpump
						true, true, true, true,			// Detector, Hydrometer, Colorimeter, physlab
						false, false, false, false, 	// chemlab, chronolab, instaminer, filterpump
						false, false,					// fumigator, nukelab
						];
						
var buildingPrices = [ 
						[  1,   1,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Robut: Random every 10 ticks
						[  1,  10,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Miner: Stone every tick
						[ 10,   1,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Pumper: Gloop every tick
						[ 10,  10,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Fracker: Fumes every tick
						[ 25,  25,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Grinder: Gloop + Stone = Paste
						[ 25,  25,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Compressor: Fumes + Stone = Foam
						[ 25,  25,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Bubbler: Fumes + Gloop = Gel
						[  0, 100, 100,   0,   0,   0,  10,   0,   0,   0,   0,   0], // Crystallizer: Stone -> Ore
						[100,   0, 100,   0,   0,   0,   0,  10,   0,   0,   0,   0], // Distiller: Gloop -> Oil
						[100, 100,   0,   0,   0,   0,   0,   0,  10,   0,   0,   0], // Vaporizer: Fumes -> Gas
						[  0,   0,   0, 100, 100, 100,   0,   0,   0,   0,   0,   0], // Tachynet: Tachyons
						[  0,   0,   0,   0,   0,   0,  10,  10,  10,   0,   0,   0], // Equalizer: Averages resources
					];
					
var buildingBasePrices = [ 
							[  1,   1,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Robut: Random every 10 ticks
							[  1,  10,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Miner: Stone every tick
							[ 10,   1,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Pumper: Gloop every tick
							[ 10,  10,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Fracker: Fumes every tick
							[ 25,  25,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Grinder: Gloop + Stone = Paste
							[ 25,  25,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Compressor: Fumes + Stone = Foam
							[ 25,  25,  10,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Bubbler: Fumes + Gloop = Gel
							[  0, 100, 100,   0,   0,   0,  10,   0,   0,   0,   0,   0], // Crystallizer: Stone -> Ore
							[100,   0, 100,   0,   0,   0,   0,  10,   0,   0,   0,   0], // Distiller: Gloop -> Oil
							[100, 100,   0,   0,   0,   0,   0,   0,  10,   0,   0,   0], // Vaporizer: Fumes -> Gas
							[  0,   0,   0, 100, 100, 100,   0,   0,   0,   0,   0,   0], // Tachynet: Tachyons
							[  0,   0,   0,   0,   0,   0,  10,  10,  10,   0,   0,   0], // Equalizer: Averages resources
						 ];			 
			 
var buildingNames = [
						"Robut",
						"Miner",
						"Pumper",
						"Fracker",
						"Grinder",
						"Compressor",
						"Bubbler",
						"Crystallizer",
						"Distiller",
						"Vaporizer",
						"Tachynet",
					];
					
var buildingDesc = 	[
						"Robut<br /><br />Randomly adds one resource every %f seconds.",
						"Miner<br /><br />Adds stone every %f seconds.",
						"Pumper<br /><br />Adds gloop every %f seconds.",
						"Fracker<br /><br />Adds fumes every %f seconds.",
						"Grinder<br /><br />Convert 1 Stone and 1 Gloop to 1 Paste every tick.",
						"Compressor<br /><br />Convert 1 Fumes and 1 Stone to 1 Foam every tick.",
						"Bubbler<br /><br />Convert 1 Gloop and 1 Fumes to 1 Gel every tick.",
						"Crystallizer<br /><br />Convert 10 Stone to 1 Ore every tick.",
						"Distiller<br /><br />Convert 10 Gloop to 1 Oil every tick.",
						"Vaporizer<br /><br />Convert 10 Fumes to 1 Gas every tick.",
						"Tachynet<br /><br />Consumes 1 random resource every tick. Chance to collect tachyons.",
					];

			 
var upgradePrices = [
						[  9,   9,   9,   0,   0,   0,   0,   0,   0,   0,   0,   0], // CPU: Faster Robuts. (Robuts+1) * (Robuts+1) * (totalRobutPrice) * (totalRobutPrice) * (CPU Count + 1)
						[100,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Magdrill: Faster miners
						[  0, 100,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Condenser: Faster pumpers
						[  0,   0, 100,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Vacpump: Faster frackers
						[  0, 100, 100,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Detector
						[100,   0, 100,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Hydrometer
						[100, 100,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Colorimeter
						[100, 100, 100,   0,   0,   0,   0,   0,   0,   0,   0,   0], // Physlab
						[  0,   0,   0, 100, 100, 100,   0,   0,   0,   0,   0,   0], // Chemlab
						[  0,   0,   0,   0,   0,   0, 100, 100, 100,   0,   0,   0], // Chronolab
						[  0,   0,   0,   0,   0,   0, 100,   0,   0,   0,   0,   0], // Instaminer
						[  0,   0,   0,   0,   0,   0,   0, 100,   0,   0,   0,   0], // Filterpump
						[  0,   0,   0,   0,   0,   0,   0,   0, 100,   0,   0,   0], // Fumigator
						[  0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   1,   1], // Nukelab
					];
					
var upgradeNames =	[
						"CPU",
						"Magdrill",
						"Condenser",
						"Vacpump",
						"Detector",
						"Hydrometer",
						"Colorimeter",
						"PhysLab",
						"ChemLab",
						"ChronoLab",
						"Instaminer",
						"Filterpump",
						"Fumigator",
						"Nukelab",
					];
					
var upgradeDesc = 	[
						"CPU<br /><br />Decrease the activation time of Robuts to %f seconds.",
						"Magdrill<br /><br />Decrease the activation time of Miners to %f seconds.",
						"Condenser<br /><br />Decrease the activation time of Pumpers to %f seconds.",
						"Vacpump<br /><br />Decrease the activation time of Frackers to %f seconds.",
						"Detector<br /><br />Allows Robuts and Miners to find Ore.",
						"Hydrometer<br /><br />Allows Robuts and Pumpers to find Oil.",
						"Colorimeter<br /><br />Allows Robuts and Frackers to find Gas.",
						"Physlab<br /><br />Unlocks new material creation buildings.",
						"Chemlab<br /><br />Unlocks new material refinery buildings.",
						"Chronolab<br /><br />Unlocks new material synthesis buildings.",
						"Instaminer<br /><br />Allows direct collection of Ore.",
						"Filterpump<br /><br />Allows direct collection of Oil.",
						"Fumigator<br /><br />Allows direct collection of Gas.",
						"Nukelab<br /><br />Unlock dangerous experimental facilities.",
					];
					
var loglist = [ "<br />", "<br />", "<br />", "<br />", "<br />" ]; // Five lines

// Specific resource multipliers
var mClickMult = [	1, 1, 1,    // Stone, Gloop, Fumes
					1, 1, 1,    // Ore, Oil, Gas
					1, 1, 1,    // Paste, Foam, Gel
					1, 1, 1, ]; // Unobtanium, Tachyons, Antimatter
					
var mAutoMult = [	1, 1, 1,    // Stone, Gloop, Fumes
					0, 0, 0,    // Ore, Oil, Gas
					0, 0, 0,    // Paste, Foam, Gel
					0, 0, 0, ]; // Unobtanium, Tachyons, Antimatter
					
				 
// Click counters
var mClicks = [0, 0, 0, 0];

// Save doojobbies
var autosave = true;
var autosavecounter = 120;

// Trader info: is he active [0], he wants how many [1] of what [2], is offering how many [3] of what [4], for how many more ticks [5]
var trader = [0, 0, 0, 0, 0, 0, ];
var traderchance = 1000;

// Increment functions

function clickStone() 
{
	mClicks[0]++;
	giveRes(0, true);
	if (Math.random() * 100 < mClickMult[6]) { giveRes(6, true); writelog("Rare Resource Found!"); }
	updateUI();
}

function clickGloop() 
{
	mClicks[0]++;
	giveRes(1, true);
	if (Math.random() * 100 < mClickMult[7]) { giveRes(7, true); writelog("Rare Resource Found!"); }
	updateUI();
}

function clickFumes() 
{
	mClicks[0]++;
	giveRes(2, true);
	if (Math.random() * 100 < mClickMult[8]) { giveRes(8, true); writelog("Rare Resource Found!"); }
	updateUI();
}

function clickOre() 
{
	mClicks[0]++;
	giveRes(6, true);
	updateUI();
}
function clickOil() 
{
	mClicks[0]++;
	giveRes(7, true);
	updateUI();
}
function clickGas() 
{
	mClicks[0]++;
	giveRes(8, true);
	updateUI();
}


function giveRes(which, isClick)
{
	var toGive = 1;
	if (isClick) 
	{ 
		toGive *= mClickMult[which]; 
	} 
	else 
	{ 
		toGive *= mAutoMult[which]; 
	}
	resources[which] += toGive;
}

function makeBuildingButtons()
{
	$("#buypanel").empty();
	
	for (var i = 0; i < MAXBUILDINGS; i++)
	{
		if (canhasbuildings[i] == false) continue;
	
		var iStr = i.toString();
		var mButton = "<div onmouseover=\"showBuildingText(" + iStr + ")\" class=\"fs center well\">";
		mButton += buildingNames[i] + "<br />";
		mButton += "<div class=\"fs btn shalf\" style=\"float: left;\">";
		mButton += "<img src=\"img/" + buildingNames[i].toLowerCase() + ".png\" height=\"100\" width=\"100\" /><br />";
		mButton += "</div>";
		mButton += "<div class=\"fs btn shalf\" style=\"float: right;\">";
		for (var j = 0; j < MAXRESOURCES; j++)
		{
			if (buildingPrices[i][j] > 0)
			{
				var rName = resourceNames[j].toLowerCase();
				mButton += "&nbsp;<img src=\"img/" + rName + "tiny.png\" ><span class=\"" + rName + "\">" + buildingPrices[i][j] + "&nbsp;</span><br />";
			}
		}
		mButton += "</div>";
		mButton += "<br style=\"clear: both;\" />";
		
		//var mButton = "<button onclick=\"buyThing(" + iStr + ")\" onmouseover=\"showBuildingText(" + iStr + ")\" class=\"fs shalf\">";

		mButton += "<a onclick=\"sellThing(" + iStr + ")\" style=\"float: left;\" class=\"fs squarter btn btn-danger\">SELL<br />ONE</a>";
		mButton += "<a onclick=\"sellAll(" + iStr + ")\" style=\"float: left;\" class=\"fs squarter btn btn-danger\">SELL<br />ALL</a>";
		mButton += "<a onclick=\"buyAll(" + iStr + ")\" style=\"float: right;\" class=\"fs squarter btn btn-success\">BUY<br />ALL</a>";
		mButton += "<a onclick=\"buyThing(" + iStr + ")\" style=\"float: right;\" class=\"fs squarter btn btn-success\">BUY<br />ONE</a>";
		mButton += "<br style=\"clear: both;\" />";
		mButton += "</div>";

		$("#buypanel").append(mButton);
	}
}

function makeUpgradeButtons()
{
	$("#upgradebuttons").empty();
	
	for (var i = 0; i < MAXUPGRADES; i++)
	{
		if (canhasupgrades[i] == false) continue;
		
		var iStr = i.toString();
		var mButton = "<button onclick=\"buyUpgrade(" + iStr + ")\" onmouseover=\"showUpgradeText(" + iStr + ")\" class=\"fb wide\">"
		mButton += "<img src=\"img/" + upgradeNames[i].toLowerCase() + ".png\" height=\"50\" width=\"50\" />&nbsp;&nbsp;";
		mButton += upgradeNames[i] + "&nbsp;&nbsp;|&nbsp;&nbsp;";

		for (var j = 0; j < MAXRESOURCES; j++)
		{
			if (upgradePrices[i][j] > 0)
			{
				var rName = resourceNames[j].toLowerCase();
				mButton += "&nbsp;<img src=\"img/" + rName + "tiny.png\" ><span class=\"" + rName + "\">" + upgradePrices[i][j] + "&nbsp;</span>&nbsp;";
			}
		}
		mButton += "</button>";

		$("#upgradebuttons").append(mButton);
	}
}

function updateUI()
{
	updateStats();
	updateCanBuy();
}

function initializeStatPanel()
{
	$("#statpanel").empty();
	
	// Update the resources first
	$("#statpanel").append("<p class=\"center\">Resources:</p>");
	
	var statLineIndex = 0;
	for( var resgroup=1; resgroup<=4; resgroup++ ) {
		$("#statpanel").append("<fieldset><legend id=\"resGroup"+ resgroup +"\"></legend>")
						.append( makeStatline(statLineIndex++) )
						.append( makeStatline(statLineIndex++) )
						.append( makeStatline(statLineIndex++) );
	}

	$("#resGroup1").text("Raw")      .tooltip( {placement:"bottom", title:"Stuff just lying around. Send robuts or simple machines to gather them."} );
	$("#resGroup2").text("Synthetic").tooltip( {placement:"bottom", title:"Little bit of this, dash of that. Cook these up in your physics lab."} );
	$("#resGroup3").text("Refined")  .tooltip( {placement:"bottom", title:"The good stuff. With small improvements your machines might get lucky. With specialized equipment you might be able to extract these directly. Find a chemist for bulk distillation methods."} );
	$("#resGroup4").text("Exotic")   .tooltip( {placement:"bottom", title:"ERROR: Data corrupted. Source: Classified"} );

	$("#statpanel").append("<hr>");

	// Then the buildings we own...
	$("#statpanel").append("<p class=\"center\">Buildings:</p><div id=\"bld\"></div>");
	
	$("#statpanel").append("<hr>");
	
	// Then the upgrades we have
	$("#statpanel").append("<p class=\"center\">Upgrades:</p><div id=\"upg\"></div>");

	$("#statpanel").append("<hr>");

	// Then the general game stats
	$("#statpanel").append("<p class=\"center\">Stats:</p>");

	$("#statpanel").append("<p>Resource Clicks: <span id=\"clicks0\">" + mClicks[0] + "</span></p>");
	$("#statpanel").append("<p>Purchase Clicks: <span id=\"clicks1\">" + mClicks[1] + "</span></p>");
	$("#statpanel").append("<p>Upgrade Clicks: <span id=\"clicks2\">" + mClicks[2] + "</span></p>");
	$("#statpanel").append("<p>Total Clicks: <span id=\"clicks3\">" + mClicks[3] + "</span></p>");
}

function makeStatline(i) {
	var rNameLower = resourceNames[i].toLowerCase();
	var statline = "<p class=\"" + rNameLower + "\"><img src=\"img/" + rNameLower + "tiny.png\" >" + resourceNames[i] + ": ";
	statline += "<span id=\"res" + i.toString() + "\">"+ Math.floor(resources[i]) + "</span></p>";
	return statline;
}

function updateResources()
{
	for (var i = 0; i < MAXRESOURCES; i++)
	{
		var which = "#res" + i.toString();
		$(which).text(Math.floor(resources[i]).toString());
	}
}

function updateBuildings()
{
	$("#bld").empty();
	for (var i = 0; i < MAXBUILDINGS; i++)
	{
		if (buildings[i] > 0)
			$("#bld").append("<p>" + buildingNames[i] + "s: " + buildings[i] + "</p>");
	}
}

function updateUpgrades()
{
	$("#upg").empty();
	for (var i = 0; i < MAXUPGRADES; i++)
	{
		if (upgrades[i] > 0)
			$("#upg").append("<p>" + upgradeNames[i] + "s: " + upgrades[i] + "</p>");
	}
}

function updateClicks()
{
	for (var i = 0; i < 4; i++)
	{
		var which = "#clicks" + i.toString();
		$(which).text(Math.floor(mClicks[i]).toString());
	}
}


function updateStats()
{
	updateResources();
	updateBuildings();
	updateUpgrades();
	updateClicks();
}

function buyThing(whatToBuy)
{
	var didBuy = false;
	if (resources[0] >= buildingPrices[whatToBuy][0] && resources[1] >= buildingPrices[whatToBuy][1] && resources[2] >= buildingPrices[whatToBuy][2] &&
		resources[3] >= buildingPrices[whatToBuy][3] && resources[4] >= buildingPrices[whatToBuy][4] && resources[5] >= buildingPrices[whatToBuy][5] &&
		resources[6] >= buildingPrices[whatToBuy][6] && resources[7] >= buildingPrices[whatToBuy][7] && resources[8] >= buildingPrices[whatToBuy][8] )
	{
		resources[0] -= buildingPrices[whatToBuy][0]; resources[1] -= buildingPrices[whatToBuy][1]; resources[2] -= buildingPrices[whatToBuy][2];
		resources[3] -= buildingPrices[whatToBuy][3]; resources[4] -= buildingPrices[whatToBuy][4]; resources[5] -= buildingPrices[whatToBuy][5];
		resources[6] -= buildingPrices[whatToBuy][6]; resources[7] -= buildingPrices[whatToBuy][7]; resources[8] -= buildingPrices[whatToBuy][8];
		buildings[whatToBuy]++;
		mClicks[1]++;
		updatePrices();
		writelog("Bought " + buildingNames[whatToBuy]);
		didBuy = true;
	}
	updateCanBuy();
	updateUI();
	return didBuy;
}

function sellThing(whatToSell)
{
	var didSell = false;
	if (buildings[whatToSell] > 0)
	{
		resources[0] += Math.floor(buildingPrices[whatToSell][0] / 2);
		resources[1] += Math.floor(buildingPrices[whatToSell][1] / 2);
		resources[2] += Math.floor(buildingPrices[whatToSell][2] / 2);
		resources[3] += Math.floor(buildingPrices[whatToSell][3] / 2);
		resources[4] += Math.floor(buildingPrices[whatToSell][4] / 2);
		resources[5] += Math.floor(buildingPrices[whatToSell][5] / 2);
		resources[6] += Math.floor(buildingPrices[whatToSell][6] / 2);
		resources[7] += Math.floor(buildingPrices[whatToSell][7] / 2);
		resources[8] += Math.floor(buildingPrices[whatToSell][8] / 2);
		
		buildings[whatToSell]--;
		mClicks[1]++;
		updatePrices();
		writelog("Sold " + buildingNames[whatToSell]);
		didSell = true;
	}
	updateCanBuy();
	updateUI();
	return didSell;
}

function sellAll(whatToSell)
{
	while (sellThing(whatToSell));
}

function buyAll(whatToBuy)
{
	while (buyThing(whatToBuy));
}

function handleCanBuyConditions()
{
	if (countmax[0] == 1) { canhasupgrades[0] = false; } // CPU
	if (countmax[1] == 1) { canhasupgrades[1] = false; } // Magdrill
	if (countmax[2] == 1) { canhasupgrades[2] = false; } // Condenser
	if (countmax[3] == 1) { canhasupgrades[3] = false; } // VacPump
	if (upgrades[4] == 1) { canhasupgrades[4] = false; } // Detector
	if (upgrades[5] == 1) { canhasupgrades[5] = false; } // Hydrometer
	if (upgrades[6] == 1) { canhasupgrades[6] = false; } // Colorimeter
	if (upgrades[7] == 1) { canhasupgrades[7] = false; canhasupgrades[8] = true; canhasbuildings[4] = true; canhasbuildings[5] = true; canhasbuildings[6] = true; } // PhysLab
	if (upgrades[8] == 1) { canhasupgrades[8] = false; canhasupgrades[9] = true; canhasbuildings[7] = true; canhasbuildings[8] = true; canhasbuildings[9] = true; } // ChemLab
	if (upgrades[9] == 1) { canhasupgrades[9] = false; canhasbuildings[10] = true; canhasupgrades[10] = true; canhasupgrades[11] = true; canhasupgrades[12] = true; } // ChronoLab
	if (upgrades[10] == 1) { canhasupgrades[10] = false; } // Instaminer
	if (upgrades[11] == 1) { canhasupgrades[11] = false; } // Filterpump
	if (upgrades[12] == 1) { canhasupgrades[12] = false; } // Fumigator
	if (upgrades[10] == 1 && upgrades[11] == 1 && upgrades[12] == 1) { canhasupgrades[13] = true; } // allow nuclab?
	if (upgrades[13] == 1) { canhasbuildings[12] = true; canhasupgrades[13] = false; }
}

function buyUpgrade(whatToBuy)
{
	if (resources[0] >= upgradePrices[whatToBuy][0] && resources[1] >= upgradePrices[whatToBuy][1] && resources[2] >= upgradePrices[whatToBuy][2] && 
		resources[3] >= upgradePrices[whatToBuy][3] && resources[4] >= upgradePrices[whatToBuy][4] && resources[5] >= upgradePrices[whatToBuy][5] && 
		resources[6] >= upgradePrices[whatToBuy][6] && resources[7] >= upgradePrices[whatToBuy][7] && resources[8] >= upgradePrices[whatToBuy][8])
	{
		resources[0] -= upgradePrices[whatToBuy][0]; resources[1] -= upgradePrices[whatToBuy][1]; resources[2] -= upgradePrices[whatToBuy][2];
		resources[3] -= upgradePrices[whatToBuy][3]; resources[4] -= upgradePrices[whatToBuy][4]; resources[5] -= upgradePrices[whatToBuy][5];
		resources[6] -= upgradePrices[whatToBuy][6]; resources[7] -= upgradePrices[whatToBuy][7]; resources[8] -= upgradePrices[whatToBuy][8];
		
		upgrades[whatToBuy]++;
		mClicks[2]++;

		switch(whatToBuy)
		{
			case 0: // CPU: Faster Robuts. (Robuts+1) * (Robuts+1) * (totalRobutPrice) * (totalRobutPrice) * (CPU Count + 1)
				countmax[0]--; updateCanBuy(); break;
			case 1: // Magdrill
				countmax[1]--; updateCanBuy(); break;
			case 2: // Condenser
				countmax[2]--; updateCanBuy(); break;
			case 3: // VacPump
				countmax[3]--; updateCanBuy(); break;
			case 4: // autoore
				mAutoMult[6]++; updateCanBuy(); break;
			case 5: // autooil
				mAutoMult[7]++; updateCanBuy(); break;
			case 6: // autogas
				mAutoMult[8]++; updateCanBuy(); break;
			case 10: // Instaminer
				resetMainMenu(); fixMainMenu(); break;
			case 11: // filterpump
				resetMainMenu(); fixMainMenu(); break;
			case 12: // fumigator
				resetMainMenu(); fixMainMenu(); break;
		}
		
		handleCanBuyConditions();
		updatePrices();
		writelog("Bought " + upgradeNames[whatToBuy]);
	}
	updateCanBuy();
	updateUI();
}

function updateCanBuy()
{
	// Remove the CPU button. We are robut-ing every tick.
	if (countmax[0] == 1) {	canhasupgrades[0] = false; }
	if (countmax[1] == 1) {	canhasupgrades[1] = false; }
	if (countmax[2] == 1) {	canhasupgrades[2] = false; }
	if (countmax[3] == 1) {	canhasupgrades[3] = false; }
}

// Since a lot of this shit is interdependent, update ALL the prices when anything gets bought.
function updatePrices()
{
	// Buildings grow at a standard rate
	for (var i = 0; i < MAXBUILDINGS; i++)
	{
		for (var j = 0; j < MAXRESOURCES; j++)
		{
			buildingPrices[i][j] = Math.ceil(buildingBasePrices[i][j] * ((3 * (buildings[i]+1) * (buildings[i]+1) / 2)));
		}
	}

	// CPU
	upgradePrices[0][0] = Math.ceil( (buildings[0]+1) * (upgrades[0] + 1) * (upgrades[0] + 1) * (buildingPrices[0][0] + buildingPrices[0][1] + buildingPrices[0][2]) );
	upgradePrices[0][1] = upgradePrices[0][0];
	upgradePrices[0][2] = upgradePrices[0][0];

	// Three Base Upgrades (magdrill, condenser, vacpump)
	for (i = 1; i < 4; i++)
	{
		upgradePrices[i][0] = 0;
		upgradePrices[i][1] = 0;
		upgradePrices[i][2] = 0;
		upgradePrices[i][i-1] = 100 * (buildings[i]+1) * (buildings[i]+1) * (upgrades[i]+1) * (upgrades[i]+1);
	}

	makeUpgradeButtons();
	makeBuildingButtons();
}

function fixMainMenu()
{
	var top = $( window ).height() / 2;
	var left = $( window ).width() / 2;
	var menu = $("#mainmenu");
	var menu_width = menu.outerWidth();
	menu.stop().css("top", top - menu_width / 2).css("left", left - 25);
	menu.css("-webkit-transform", "scale(0.25)");
	menu.css("-moz-transform", "scale(0.25)");
	menu.css("transform", "scale(0.25)");
	menu.css("opacity", 0.25);
	menu.show();
	scaleUp(menu, 0.25);
}

function resetMainMenu()
{
	$("#mainmenu").empty();
	$("#mainmenu").append("<li><a onclick=\"clickStone()\"><img src=\"img/stone.png\" height=\"100\" width=\"100\" /></a><span>Stone</span></li>");
	if (upgrades[10] > 0) {$("#mainmenu").append("<li><a onclick=\"clickOre()\"><img src=\"img/ore.png\" height=\"100\" width=\"100\" /></a><span>Ore</span></li>");}
	$("#mainmenu").append("<li><a onclick=\"clickGloop()\"><img src=\"img/gloop.png\" height=\"100\" width=\"100\" /></a><span>Gloop</span></li>");
	if (upgrades[11] > 0) {$("#mainmenu").append("<li><a onclick=\"clickOil()\"><img src=\"img/oil.png\" height=\"100\" width=\"100\" /></a><span>Oil</span></li>");}
	$("#mainmenu").append("<li><a onclick=\"clickFumes()\"><img src=\"img/fumes.png\" height=\"100\" width=\"100\" /></a><span>Fumes</span></li>");
	if (upgrades[12] > 0) {$("#mainmenu").append("<li><a onclick=\"clickGas()\"><img src=\"img/gas.png\" height=\"100\" width=\"100\" /></a><span>Gas</span></li>");}
	doMenu();
	fixMainMenu();
}

function HandleBot(whichBots, howMany)
{
	switch(whichBots)
	{
		case 0: // Robuts: Give random
			giveRandom(howMany); break;
		case 1: // Miners: Stone
			for (i = 0; i < howMany; i++) 
			{ 
				giveRes(0, false); 
				if (Math.random() * 100 < mClickMult[3]) { giveRes(6, true); writelog("Rare Resource Found!"); }
			} 
			break;
		case 2: // Pumpers: Gloop
			for (i = 0; i < howMany; i++) 
			{ 
				giveRes(1, false); 
				if (Math.random() * 100 < mClickMult[4]) { giveRes(7, true); writelog("Rare Resource Found!"); }
			} 
			break;
		case 3: // Frackers: Fumes
			for (i = 0; i < howMany; i++) 
			{ 
				giveRes(2, false); 
				if (Math.random() * 100 < mClickMult[5]) { giveRes(8, true); writelog("Rare Resource Found!"); }
			} 
			break;
		case 4: // Grinder: Fumes + Stone = Foam
			for (i = 0; i < howMany; i++)
			{
				if (resources[0] > 0 && resources[1] > 0)
				{ resources[0]--; resources[1]--; resources[3]++; }
			}
			break;
		case 5: // Compressor: Fumes + Stone = Foam
			for (i = 0; i < howMany; i++)
			{
				if (resources[0] > 0 && resources[2] > 0)
				{ resources[0]--; resources[2]--; resources[4]++; }
			}
			break;
		case 6: // Bubbler: Fumes + Gloop = Gel
			for (i = 0; i < howMany; i++)
			{
				if (resources[1] > 0 && resources[2] > 0)
				{ resources[1]--; resources[2]--; resources[5]++; }
			}
			break;
		case 7: // Crystallizer: Stone -> Ore
			for (i = 0; i < howMany; i++)
			{
				if (resources[0] > 10) { resources[0] -= 10; resources[6]++; }
			}
			break;
		case 8: // Distiller: Gloop -> Oil
			for (i = 0; i < howMany; i++)
			{
				if (resources[1] > 10) { resources[1] -= 10; resources[7]++; }
			}
			break;			
		case 9: // Vaporizer: Fumes -> Gas
			for (i = 0; i < howMany; i++)
			{
				if (resources[2] > 10) { resources[2] -= 10; resources[8]++; }
			}
			break;			
		case 10: // Tachynet: Collect tachyons, consume resources
			for (i = 0; i < howMany; i++)
			{
				var whatToEat = Math.floor(Math.random() * 9);
				if (resources[whatToEat] > 0)
				{
					resources[whatToEat]--;
					if (Math.random() * curTimeout < 2)
					{
						resources[10]++;
					}
				}
			}
			break;	
		case 11: // Equalizer: Averages resources. Does not include the three silver-tiers.
			var avg = (resources[0] + resources[1] + resources[2] + resources[3] + resources[4] + resources[5] + resources[6] + resources[7] + resources[8]) / 9;
			for (i = 0; i < 9; i++)
			{
				if (resources[i] < avg) { resources[i]++; } else { resources[i]--; }
			}
			break;
	}
}

function giveRandom(howMany)
{
	for (var i = 0; i < howMany; i++)
	{
		var whichMat = Math.floor((Math.random() * 3));
		switch (whichMat)
		{
			case 0: giveRes(0, false); break;
			case 1: giveRes(1, false); break;
			case 2: giveRes(2, false); break;
		}
	}
}

function updateBuildingActions()
{
	for (var i = 0; i < MAXBUILDINGS; i++)
	{
		if (buildings[i] > 0)
		{
			counters[i] -= 1;
			if (counters[i] == 0)
			{
				counters[i] = countmax[i];
				HandleBot(i, buildings[i]);
			}
		}
	}
}

function updateTrader()
{
	if (trader[0] == 0) // Trader's not around?
	{
		if (Math.random() * 1000 > traderchance)
		{
			// initialize the trader!
			// What I want is always going to be 8 or less.
			var whatIWant = Math.floor(Math.random() * 9);
			
			// What I have is always going to be 3 or greater - and always at least one tier higher than what I want.
			var whatIHave = Math.floor(Math.random() * 9) + 3;
			while (Math.floor(whatIHave / 3) <= Math.floor(whatIWant / 3))
			{
				whatIHave = Math.floor(Math.random() * 9) + 3;
			}
			
			// The order of magnitude difference is 10-20 ^ (difference in tiers)
			var tierDiff = Math.floor(whatIHave / 3) - Math.floor(whatIWant / 3) + 1;
			var oom = Math.pow(3 + (Math.random() * 10), tierDiff);
			
			trader[0] = 1;
			trader[1] = Math.floor((Math.random() * 25) * oom);
			trader[2] = whatIWant;
			trader[3] = Math.floor(Math.random() * 25);
			trader[4] = whatIHave;
			trader[5] = Math.floor(Math.random() * 15) + 15;
			
			// Should initialize the button here...
			var tradeButton = "<button onclick=\"doTrade()\" class=\"fb wide\">";
			tradeButton += "<img src=\"img/" + resourceNames[trader[2]].toLowerCase() + "tiny.png\" height=\"50\" width=\"50\" />&nbsp;&nbsp;" + trader[1].toString() + "&nbsp;&nbsp;";
			tradeButton += "<img src=\"img/trade.png\" height=\"50\" width=\"50\" />";
			tradeButton += trader[3].toString() + "&nbsp;&nbsp;<img src=\"img/" + resourceNames[trader[4]].toLowerCase() + "tiny.png\" height=\"50\" width=\"50\" />";

			$("#traderbutton").append(tradeButton).attr('title', 'Trade with passing merchant ship');
		}
		else
		{
			traderchance--;
		}
	}
	else // trader IS in town?
	{
		trader[5]--;
		if (trader[5] == 0)
		{
			trader = [0, 0, 0, 0, 0, 0, ];
			traderchance = 1000;
			
			// Button goes away here
			$("#traderbutton").empty();
		}
	}
}

function doTrade()
{
	if (resources[trader[2]] >= trader[1])
	{
		resources[trader[2]] -= trader[1];
		resources[trader[4]] += trader[3];
		
		// Do log writing here?
		updateResources();
	}
}

function updateGameLoop()
{
	if (autosave)
	{
		autosavecounter--;
		if (autosavecounter == 0)
		{
			autosavecounter = 120;
			save("auto");
		}
	}

	updateTachyons();

	updateTrader();
	updateBuildingActions();
	updateUI();
	updateNotifications();

	window.setTimeout(updateGameLoop, curTimeout);
}

function updateTachyons()
{
	// Tachyon adjustment and interval reset
	if (resources[10] > 0)
	{
		var ratio = resources[10] / 100;
		if (ratio > 1) { ratio = 1; }
		var amountToChange = ((0.5 - Math.random()) * ratio) + 1;
		curTimeout = Math.round(curTimeout * amountToChange);
		
		var isEmergency = false;
		// Handle the emergency cases
		if (curTimeout <= 100)
		{
			isEmergency = true;
			if (curTimeout < 50)
			{
				curTimeout = 50;
			}
		}
		else if (curTimeout >= 1000)
		{
			isEmergency = true;
			if (curTimeout > 2000)
			{
				curTimeout = 2000;
			}
		}
		if (isEmergency)
		{
			resources[10]--;
			if (resources[10] == 0)
			{
				notifications[0][0] = false;
			} 
			else
			{
				notifications[0][0] = true;
			}
		}
		else 
		{
			notifications[0][0] = false;
		}
	}
	else
	{
		curTimeout = baseTimeout;
	}
}

function updateNotifications()
{
	for (var i = 0; i < notifications.length; i++)
	{
		if (notifications[i][0] == notifications[i][1]) 
		{
			continue; // No change
		}
		else
		{
			notifications[i][1] = notifications[i][0];			// Mark the change
			
			if (notifications[i][0]) 							// Show this one?
			{
				var mAlert = "<img src=\"img/" + notTypes[i] + "warning.png\" id=\"" + notTypes[i] + "alert\" />";
				$("#alerts").append(mAlert);
				$("#" + notTypes[i] + "alert").tooltip( { title: notDesc[i] } );
			}
			else 												// Hide this one?
			{
				$("#" + notTypes[i] + "alert").remove();
				$(".tooltip").remove();
			}
		}
	}
}

window.setTimeout(updateGameLoop, curTimeout);

function writelog(newline)
{
	loglist.shift();
	loglist.push(newline);
	updatelog();
}

function updatelog()
{
	$("#log").empty();
	$("#log").append("Event Log: <br />");
	for (var i = 0; i < 5; i++)
	{
		$("#log").append(loglist[i] + "<br />");
	}
}

// Loading and Saving routines from CC (more or less)
function bake_cookie(name, value) 
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + 30);
	var cookie = [name, '=', JSON.stringify(value),'; expires=.', exdate.toUTCString(), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
	document.cookie = cookie;
}

function read_cookie(name) 
{
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
}

function load(loadType)
{
	//define load variables
	var loadVar = {};
		
	if (loadType == 'cookie')
	{
		//check for cookies
		if (read_cookie('plcl'))
		{
			//set variables to load from
			loadVar = read_cookie('plcl');
			writelog("Loaded successfully");
		} else {
			console.log('Unable to find cookie');
			return false;
		};
	}
	
	if (loadType == 'localStorage'){
		//check for local storage
		try {
			string1 = localStorage.getItem('plcl');
		} catch(err) {
			console.log('Cannot access localStorage - browser may not support localStorage, or storage may be corrupt')
		}
		if (string1){
			loadVar = JSON.parse(string1);
		} else {
			console.log('Unable to find variables in localStorage. Attempting to load cookie.')
			load('cookie');
			return false;
		}
	}
	
	if (loadType == 'import'){
		//take the import string, decompress and parse it
		var compressed = document.getElementById('impexpField').value;
		var decompressed = LZString.decompressFromBase64(compressed);
		var revived = JSON.parse(decompressed);
		//set variables to load from
		loadVar = revived[0];
		//notify user
		//close import/export dialog
		//impexp();
	}
	
	if (loadVar.version == VERSION)
	{
		resources = loadVar.resources;
		buildings = loadVar.buildings;
		upgrades = loadVar.upgrades;
		counters = loadVar.counters;
		countmax = loadVar.countmax;
		mClickMult = loadVar.mClickMult;
		mAutoMult = loadVar.mAutoMult;
		mClicks = loadVar.mClicks;
		buildingPrices = loadVar.buildingPrices;
		upgradePrices = loadVar.upgradePrices;
		canhasbuildings = loadVar.canhasbuildings;
		canhasupgrades = loadVar.canhasupgrades;
	}
	else
	{
		// Handle loading other versions here.
		if (loadVar.version <= 0.3)
		{
			for (var i = 0; i < loadVar.resources.length; i++) { resources[i] = loadVar.resources[i]; }
			for (var i = 0; i < loadVar.buildings.length; i++) { buildings[i] = loadVar.buildings[i]; }
			for (var i = 0; i < loadVar.upgrades.length; i++) { upgrades[i] = loadVar.upgrades[i]; }
			for (var i = 0; i < loadVar.counters.length; i++) { counters[i] = loadVar.counters[i]; }
			for (var i = 0; i < loadVar.countmax.length; i++) { countmax[i] = loadVar.countmax[i]; }
			for (var i = 0; i < loadVar.mClickMult.length; i++) { mClickMult[i] = loadVar.mClickMult[i]; }
			for (var i = 0; i < loadVar.mAutoMult.length; i++) { mAutoMult[i] = loadVar.mAutoMult[i]; }
			for (var i = 0; i < loadVar.mClicks.length; i++) { mClicks[i] = loadVar.mClicks[i]; }
			for (var i = 0; i < loadVar.buildingPrices.length; i++) { buildingPrices[i] = loadVar.buildingPrices[i]; }
			for (var i = 0; i < loadVar.upgradePrices.length; i++) { upgradePrices[i] = loadVar.upgradePrices[i]; }
			for (var i = 0; i < loadVar.canhasbuildings.length; i++) { canhasbuildings[i] = loadVar.canhasbuildings[i]; }
			for (var i = 0; i < loadVar.canhasupgrades.length; i++) { canhasupgrades[i] = loadVar.canhasupgrades[i]; }
			
			$('#whatsnewModal').modal('show');
		}
	}
}

load('localStorage');//immediately attempts to load

function save(savetype){
	//Create objects and populate them with the variables, these will be stored in cookies
	//Each individual cookie stores only ~4000 characters, therefore split currently across two cookies
	//Save files now also stored in localStorage, cookies relegated to backup
	saveVar = {
		version:VERSION,
		resources:resources,
		buildings:buildings,
		upgrades:upgrades,
		counters:counters,
		countmax:countmax,
		mClickMult:mClickMult,
		mAutoMult:mAutoMult,
		mClicks:mClicks,
		buildingPrices:buildingPrices,
		upgradePrices:upgradePrices,
		canhasbuildings:canhasbuildings,
		canhasupgrades:canhasupgrades,
	}
	//Create the cookies
	bake_cookie('plcl',saveVar);
	
	console.log(JSON.stringify(saveVar).length);
	//set localstorage
	try {
		localStorage.setItem('plcl', JSON.stringify(saveVar));
	} catch(err) {
		console.log('Cannot access localStorage - browser may be old or storage may be corrupt')
	}
	//Update console for debugging, also the player depending on the type of save (manual/auto)
	console.log('Attempted save');
	if (savetype == 'export'){
		var string = '[' + JSON.stringify(saveVar) + ',' + JSON.stringify(saveVar2) + ']';
		var compressed = LZString.compressToBase64(string);
		console.log('Compressing Save');
		console.log('Compressed from ' + string.length + ' to ' + compressed.length + ' characters');
		document.getElementById('impexpField').value = compressed;
		//gameLog('Saved game and exported to base64');
	}
	if ((read_cookie('plcl') || (localStorage.getItem('plcl')))){
		console.log('Savegame exists');
		if (savetype == 'auto'){
			console.log('Autosave');
			//gameLog('Autosaved');
		} else if (savetype == 'manual'){
			alert('Game Saved');
			console.log('Manual Save');
			//gameLog('Saved game');
		}
		//_gaq.push(['_trackEvent', 'CivClicker', 'Save', savetype]);
	};
	var mDate = new Date();
	writelog("Autosaved " + mDate.getHours() + ":" + pad(mDate.getMinutes().toString()));
}

function deleteSave()
{
	//Deletes the current savegame by setting the game's cookies to expire in the past.
	var really = confirm("Are you REALLY SURE? This is not a \"soft reset\" like in some other games. This makes your progress go away entirely. No secret bonuses. You were warned."); //Check the player really wanted to do that.
	if (really){
        document.cookie = ['plcl', '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
		localStorage.removeItem('plcl');
		location.reload();
	}
}

function showUpgradeText(which)
{
	switch(which)
	{
		case 0: // CPU
		case 1: // MagDrill
		case 2: // Condenser
		case 3: // VacPump
			$("#hovertext").empty().append(sprintf(upgradeDesc[which], (countmax[which]-1) / 2)); break;

		case 4: // Detector
		case 5: // Hydrometer
		case 6: // Colorimeter
		case 7: // Physlab
		case 8: // Chemlab
		case 9: // ChronoLab
		default:
			$("#hovertext").empty().append(sprintf(upgradeDesc[which])); break;
	}
}

function showBuildingText(which)
{
	switch(which)
	{
		case 0: // Robut
		case 1: // Miner
		case 2: // Pumper
		case 3: // Fracker
			$("#hovertext").empty().append(sprintf(buildingDesc[which], (countmax[which]) / 2)); break;

		default:
			$("#hovertext").empty().append(sprintf(buildingDesc[which])); break;
	}
}

// UTIL

function pad(mVal)
{
	var pad = "00";
	return pad.substring(0, pad.length - mVal.length) + mVal;
}

updateCanBuy(); fixMainMenu(); updateUI(); updatelog(); updatePrices(); makeUpgradeButtons(); makeBuildingButtons(); initializeStatPanel();