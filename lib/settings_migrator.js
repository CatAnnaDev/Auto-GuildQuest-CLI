/** @format */

"use strict"

const DefaultSettings = {
  enabled: true,
  Vanguard: true,
  GQuest: true,
  VLog: true,
  GQuestLog: false,
  Guardian: true,
  Gbox: true,
  Daily: true,
  CLI: false,
  battleground: [102, 103, 110, 111, 112, 116, 117, 118, 119],
  gbam: [10005, 10006, 10007],
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
  if (from_ver === undefined) {
    // Migrate legacy config file
    return Object.assign(Object.assign({}, DefaultSettings), settings)
  } else if (from_ver === null) {
    // No config file exists, use default settings
    return DefaultSettings
  } else {
    // Migrate from older version (using the new system) to latest one
    throw new Error("So far there is only one settings version and this should never be reached!")
  }
}
