enum MessageType {
  INIT = "init",
  LEAVE_ROOM = "leave_room",
  MOVE = "move",
  GAME_STARTED = "game_started",
  JOINED_ROOM = "joined_room",
  DRAW = "draw",
  REPLACE_PATH = "replace_path",
  MESSAGE = "message",
  GUESS_SUCCESS = "guess_success",
  SELECT_WORD = "select_word",
  SELECECTING_WORD = 'selecting_word',
  START_ROUND = 'start_round',
  END_ROUND = 'end_round',
}

export { MessageType };
