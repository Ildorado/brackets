 module.exports = function check(str, bracketsConfig) {
  // your solution
  // array [duplicate instance, number of occurences]
  // number of occurences can be only 0 and 1 because
  // if it occured once then the second time we see it 
  // we form a pair of opening and closing brackets of them.
  let array_of_duplicates = [];
  let opening_bracket_position = -1;
  let closing_bracket_position = -1;
  bracketsConfig.forEach(element => {
    if (element[0] == element[1]) {
      array_of_duplicates.push([element[0], 0]);
    }
  });
  for (let i = str.length - 1; i >= 0; i--) {
    // if array of duplicates is not empty and str[i] is one of duplicates
    if (array_of_duplicates.length != 0 && index_in_duplicates(str[i], array_of_duplicates) != -1) {
      //if this duplicate instance occured once already then this duplicate instance
      //considered opening bracket
      if (array_of_duplicates[index_in_duplicates(str[i], array_of_duplicates)][1] == 1) {
        opening_bracket_position = i;
        array_of_duplicates[index_in_duplicates(str[i], array_of_duplicates)][1] = 0;
      }
      //if it didn't occur then before then this is the first time it occurred
      else {
        array_of_duplicates[index_in_duplicates(str[i], array_of_duplicates)][1] = 1;
      }
    }
    // if there is no current opening bracket position we look bracket
    // in this position is opening or not (duplicates have their own order, look above)
    if (index_in_duplicates(str[i], array_of_duplicates) == -1 && opening_bracket_position == -1) {
      if (is_opening_bracket(str[i], bracketsConfig)) {
        opening_bracket_position = i;
      }
    }
    //means if there is no opening brackets but string is still not empty
    if(i== 0 && opening_bracket_position == -1) {
      return false;
    }
    // if opening bracket position is defined we start 
    // to walk forward from this position to find closing bracket
    // if this closing bracket is what we need we delete both opening
    // and closing bracket, else we return false
    if (opening_bracket_position != -1) {
      if(opening_bracket_position+1 > str.length -1) {
        return false;
      }
      for (let j = opening_bracket_position + 1; j < str.length; j++) {
        if (is_closing_bracket(str[j], bracketsConfig)) {
          closing_bracket_position = j;
          if (are_brackets_matching(opening_bracket_position, closing_bracket_position, str, bracketsConfig)) {
            str = remove_character(str, opening_bracket_position);    // after removing opening br pos
            str = remove_character(str, closing_bracket_position - 1);// closing br pos moves 1 to the left
            opening_bracket_position = -1;                            //of we can just swap 2 lines above. why  I even did this??
            closing_bracket_position = -1;
            array_of_duplicates= clear_array_of_duplicates(array_of_duplicates);
            if(str.length != 0) {
              i = str.length;// it will be str.length-1 after loop is executed
              break;
            }
            else {
              return true;
            }     
          }
          else {
            return false;
          }
        }
      }
    }
  }
}
function clear_array_of_duplicates(array_of_duplicates){
  for(let i = 0; i < array_of_duplicates.length; i++) {
    array_of_duplicates[i][1]=0;
  }
  return array_of_duplicates;
}
function remove_character(str, char_pos) {
  part1 = str.substring(0, char_pos);
  part2 = str.substring(char_pos + 1, str.length);
  return (part1 + part2);
}
function are_brackets_matching(index_opening, index_closing, str, bracketsConfig) {
  for (i = 0; bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] == str[index_opening]) {
      if (bracketsConfig[i][1] == str[index_closing] ) {
        return true;
      }
      else return false;
    }
  }
  return false;
}
function is_closing_bracket(bracket, bracketsConfig) {
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracket == bracketsConfig[i][1]) {
      return true;
    }
  }
  return false;
}
function is_opening_bracket(bracket, bracketsConfig) {
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracket == bracketsConfig[i][0]) {
      return true;
    }
  }
  return false;
}
function index_in_duplicates(el, array_of_duplicates) {
  for (let i = 0; i < array_of_duplicates.length; i++) {
    if (el == array_of_duplicates[i][0]) {
      return i;
    }
  }
  return -1;
}