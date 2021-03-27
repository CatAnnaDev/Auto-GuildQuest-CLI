/** @format */

class TeraMessage {
  constructor(mod) {
    this.clr = function (text, hexColor) {
      return '<font color="#' + hexColor + '">' + text + "</font>" // 自定义
    }

    this.RED = function (text) {
      return '<font color="#FF0000">' + text + "</font>" // 红
    }
    this.BLU = function (text) {
      return '<font color="#56B4E9">' + text + "</font>" // 蓝
    }
    this.YEL = function (text) {
      return '<font color="#E69F00">' + text + "</font>" // 黄
    }
    this.TIP = function (text) {
      return '<font color="#00FFFF">' + text + "</font>" // 青
    }
    this.GRY = function (text) {
      return '<font color="#A0A0A0">' + text + "</font>" // 灰
    }
    this.PIK = function (text) {
      return '<font color="#FF00DC">' + text + "</font>" // 粉
    }

    this.chat = function (msg) {
      mod.command.message(msg)
    }
    this.party = function (msg) {
      mod.send("S_CHAT", 3, {
        channel: 21,
        name: "TIP",
        message: msg,
      })
    }
    this.guild = function (msg) {
      mod.send("C_CHAT", 1, {
        channel: 2,
        message: msg,
      })
    }
    this.raids = function (msg) {
      mod.send("S_CHAT", 3, {
        channel: 25,
        name: "TIP",
        message: msg,
      })
    }
    this.alert = function (msg, type) {
      mod.send("S_DUNGEON_EVENT_MESSAGE", 2, {
        type: type,
        chat: false,
        channel: 0,
        message: msg,
      })
    }
    this.GlobalBLUE = function (msg) {
      mod.send("C_CHAT", 1, {
        channel: config.Glob,
        name: "TIP",
        message: '<FONT color="#42f4f4"><ChatLinkAction param="1#####0@0@name">' + msg + "</ChatLinkAction>",
      })
    }
    this.guildBLUE = function (msg) {
      mod.send("C_CHAT", 1, {
        channel: 2,
        message: '<FONT color="#42f4f4"><ChatLinkAction param="1#####0@0@name">' + msg + "</ChatLinkAction>",
      })
    }
  }
}

module.exports = TeraMessage
