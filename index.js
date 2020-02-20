module.exports = function AutoGuildquestCLI(mod) {
		const {command} = mod.require
		const Quests = require("./quests.json");

	let myQuestId = 0,
		status = 2,
		progress = 0,
		hold = false
	  
	mod.game.me.on('change_zone', (zone, quick) => {
		if (mod.settings.battleground.includes(zone)) {
			hold = true
		} else if (hold && myQuestId !== 0) {
			hold = false
			completeQuest()
			dailycredit()
		}
	});
//Daily NA only
	mod.hook('S_LOGIN', 'event', () => {
		mod.hookOnce('S_SPAWN_ME', 'event', () => {
			setTimeout(dailycredit,1000+ Math.random()*250);
		});
	});
//Vandguard	
	mod.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (event) => {
		if (mod.settings.Vanguard) {
			myQuestId = event.id
			if (!hold) setTimeout(completeQuest,1000+ Math.random()*250);
			//return false;
		}
	});
//Gquest
mod.hook('S_UPDATE_GUILD_QUEST_STATUS', 1, (event) => {
	if (mod.settings.GQuest) {
		if (event.targets[0].completed == event.targets[0].total) {
			setTimeout(()=>{
			mod.send('C_REQUEST_FINISH_GUILD_QUEST', 1, {
				quest: event.quest
			})
			}, 2000 + Math.random()*1000)
			
			setTimeout(() => {
				mod.send('C_REQUEST_START_GUILD_QUEST', 1, {
					questId: event.quest
				})
			}, 4000 + Math.random()*1000)
		}
		//return false;
	}
})

mod.hook("S_GUILD_QUEST_LIST", 1, (event) => {
	if (GQuestLog) {
		GetQuestsInfo(event["quests"]);
	}
})

function GetQuestSize(size) {
	if (size == 0) {
		return "(Small)"
	} else if (size == 1) {
		return "(Medium)"
	} else {
		return "(Large)"
	}
}

function GetQuestsInfo(questEvent) {
	for (let questIndex in questEvent) {
		if ([1, 2].includes(questEvent[questIndex]["status"])) {
			let qName = questEvent[questIndex]["name"].replace("@GuildQuest:", "");
			let qSize = GetQuestSize(questEvent[questIndex]["size"]);
			let qStatus = `${questEvent[questIndex]["status"] == 1 ? "[ACTIVE]".clr("f1ef48") : "[COMPLETE]".clr("3fce29")}`;
			let qTime = new Date(1000 * questEvent[questIndex]["timeRemaining"]).toISOString().substr(11, 8);
			mod.command.message(`${qStatus} ${Quests[qName].clr("0cccd6")} ${qSize.clr("0c95d4")} Time left: ${qTime.clr("db3dce")}`)
		} else {
			continue
		}
	}
}

//Vanguard
	function completeQuest() {
		mod.send('C_COMPLETE_DAILY_EVENT', 1, {
			id: myQuestId
		})
		setTimeout(() => {
			mod.send('C_COMPLETE_EXTRA_EVENT', 1, {
				type: 0
			})
		}, 500+ Math.random()*250)
		setTimeout(() => {
			mod.send('C_COMPLETE_EXTRA_EVENT', 1, {
				type: 1
			})
		}, 1000+ Math.random()*250)
		myQuestId = 0
		console.log('Vanguard Quest claimed')
	};
//Daily NA only
	function dailycredit() {
		if (mod.settings.Daily) {
			let _ = mod.trySend('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
			 !_ ? mod.log('Unmapped protocol packet \<C_REQUEST_RECV_DAILY_TOKEN\>.') : null;
		  }
	};
//Msg
function sendMessage(msg) { command.message(msg) }
function log(msg) { console.log(msg) }

//Command
command.add('auto', {
	'VG': () => {
		mod.settings.Vanguard = !mod.settings.Vanguard
		log('Auto-Vanguardquest: ' + (mod.settings.Vanguard ? 'On' : 'Off"'));
	},
	'GQ': () => {
		mod.settings.GQuest = !mod.settings.GQuest
		log('Auto-Guildquest: ' + (mod.settings.GQuest ? 'On' : 'Off'));
	},
	'GQlog': () => {
		mod.settings.GQuest = !mod.settings.GQuest
		log('Guildquest-Log: ' + (mod.settings.GQuestLog ? 'On' : 'Off'));
	},
	'DC': () => {
		mod.settings.Daily = !mod.settings.Daily
		log('Auto-Daily-Credit: ' + (mod.settings.Daily ? 'On' : 'Off'));
	  },
	'$default': () => {
		log(`Invalid argument. usasge : auto [VG|GQ|GQlog|DC]`);
	}
  });
}


	


