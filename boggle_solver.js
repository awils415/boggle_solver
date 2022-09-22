/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

//followed along with dr. burge to implement hash


exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];

  //check if inputs are valid, return [] if invalid

  //check for empty input
  if (grid == null || dictionary == null) {
    return solutions;
    }

  //check if NxN
  let N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length != N) {

    return solutions;
    }
  }

  //convert input to same case
  convert_to_lower(grid, dictionary);

  //console.log(grid);

  //check if grid is valid
  if (!is_grid_valid(grid)) {
    console.log('TEST: ' + grid);
    return solutions;
  }
  
  //set up all data structures (visited, solutions, dictionary (trie, hash, list, set))

  let solution_set = new Set();

  let hash = gen_hashmap(dictionary);

  //iterate over NxN grid, find all words that begin with grid[y][x]
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let word = '';

      let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));

      find_words(word, y, x, grid, visited, hash, solution_set);
    }
  }
  
  solutions = Array.from(solution_set);
  
  return solutions;
}

find_words = function(word, y, x, grid, visited, hash, solution_set) {

  let adj_matrix = [[-1, -1],
                    [-1, 0],
                    [-1, 1],
                    [0, 1],
                    [1, 1],
                    [1, 0],
                    [1, -1],
                    [0, -1]];

  //base case:
  //b1: y and x out of bounds
  //b2: already visited y and x
  //return immediately

  if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true) 
    return;

  //append grid[y][x] to word
  word += grid[y][x];

  //console.log("curr word = " + word + "\n Grid[" + y + "][" + x + "] = " + grid[x][y]);
  
  //is it a prefix for any word already in hash

  if (is_prefix(word, hash)) {
  //is the prefix a complete word in dictionary
    visited[y][x] = true;
    
  //if true and word length >= 3 add word to solution_set
    if (is_word(word, hash)) {
      if (word.length >= 3)
        solution_set.add(word);
    }

  //keep searching using adjacent tiles, call find_word()
    for (let i = 0; i < 8; i++) {
      find_words(word, y + adj_matrix[i][0], x + adj_matrix[i][1], grid, visited, hash, solution_set);
    }
  }
  
  //if not prefix then unmark y,x as visited
  visited[y][x] = false;
}

//helper functions

is_prefix = function(word, hash) {
  return hash[word] != undefined;
}

is_word = function(word, hash) {
  return hash[word] == 1;
}

gen_hashmap = function(dictionary) {
  var dict= {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let word_len = dictionary[i].length;
    var str = dictionary[i];
    for (let j = word_len; word_len > 1; word_len--) {
      str = str.substr(0,word_len-1);
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      }
      else {
          dict[str] = 0;
      }
    }
  }
  return dict;
}

is_grid_valid = function(grid) {
  reg_ex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(reg_ex)) {
        return false;
      }
    }
  }
  return true;
}

convert_to_lower = function(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  
  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
}


var grid = [['T', 'W', 'Y', 'R'],
            ['E', 'N', 'P', 'H'],
            ['G', 'Z', 'Qu', 'R'],
            ['St', 'N', 'T', 'A']];

var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                  'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
console.log(exports.findAllSolutions(grid, dictionary));
