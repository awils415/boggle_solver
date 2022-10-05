/*
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];

  // check if inputs are valid, return [] if invalid

  // check for empty input
  if (grid == null || dictionary == null) {
    return solutions;
  }

  // check if NxN
  const N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length != N) {
      return solutions;
    }
  }

  // convert input to same case
  converttolower(grid, dictionary);

  // console.log(grid);

  // check if grid is valid
  if (!isgridvalid(grid)) {
    // console.log('TEST: ' + grid);
    return solutions;
  }

  // set up all data structures (visited, solutions, dictionary
  // (trie, hash, list, set))
  const solutionset = new Set();

  const hash = genhashmap(dictionary);

  // iterate over NxN grid, find all words that begin with grid[y][x]
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const word = '';

      const visited = new Array(N).fill(false).map(() =>
        new Array(N).fill(false));

      findwords(word, y, x, grid, visited, hash, solutionset);
    }
  }

  solutions = Array.from(solutionset);
  return solutions;
};

findwords = function(word, y, x, grid, visited, hash, solutionset) {
  const adjmatrix = [[-1, -1], [-1, 0], [-1, 1],
    [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

  // base case:
  // b1: y and x out of bounds
  // b2: already visited y and x
  // return immediately

  if (y < 0 || x < 0 || y >= grid.length || x >= grid.length ||
    visited[y][x] == true) {
    return;
  }

  // append grid[y][x] to word
  word += grid[y][x];

  // is it a prefix for any word in hash
  if (isprefix(word, hash)) {
  // is the prefix an actual word in dictionary
    visited[y][x] = true;
    // if true and word length >= 3 add word to solutionset
    if (isword(word, hash)) {
      if (word.length >= 3) {
        solutionset.add(word);
      }
    }

    // keep searching using adjacent tiles --> call findword()
    for (let i = 0; i < 8; i++) {
      findwords(word, y + adjmatrix[i][0], x + adjmatrix[i][1],
          grid, visited, hash, solutionset);
    }
  }

  // if not prefix then unmark y,x as visited
  visited[y][x] = false;
};

isprefix = function(word, hash) {
  return hash[word] != undefined;
};

isword = function(word, hash) {
  return hash[word] == 1;
};

genhashmap = function(dictionary) {
  const dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlen = dictionary[i].length;
    let str = dictionary[i];
    for (wordlen; wordlen > 1; wordlen--) {
      str = str.substr(0, wordlen-1);
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};

isgridvalid = function(grid) {
  regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // console.log(grid[i][j], regex.test(grid[i][j]));
      if (!grid[i][j].match(regex)) {
        return false;
      }
    }
  }
  return true;
};

converttolower = function(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
};

const grid = [['T', 'W', 'Y', 'R'],
  ['E', 'N', 'P', 'H'],
  ['G', 'Z', 'Qu', 'R'],
  ['St', 'N', 'T', 'A']];

const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
  'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));

