let solutions = []
var grid = [
            ['T', 'W', 'Y', 'R'],
            ['E', 'N', 'P', 'H'],
            ['G', 'Z', 'QU', 'R'],
            ['ST', 'N', 'T', 'A']
];

var dictionary = ['ART', 'EGO', 'GENT', 'GET', 'NET', 'NEW', 'NEWT', 'PRAT', 'PRY', 'QUA', 'QUART', 'QUARTZ', 'RAT', 'TAR', 'TARP', 'TEN', 'WENT', 'WET', 'ARTY', 'EGG', 'NOT', 'QUAR'];

//rows and columns of grid
var col = grid[0].length;
var row = grid.length;

//trie data structure
const trie_node = {'valid': false, 'next': {}};

//angles of search
let neighbors_delta = [
  (-1,-1, "↖"),
  (-1, 0, "↑"),
  (-1, 1, "↗"),
  (0, -1, "←"),
  (0,  1, "→"),
  (1, -1, "↙"),
  (1,  0, "↓"),
  (1,  1, "↘"),
];

function gen_trie(word, node) {
  if (!(word)) {
    return;
  }


  if (!(word[0] in node)) {
    node[word[0]] = {'valid': word.length = 1, 'next': {}};
  }

  //build trie recursively
  gen_trie(word.slice([1, ]), node[word[0]]);
}

function build_trie(words, trie) {
  for (w in words) {
    gen_trie(w, trie);
  }

  return trie;
}

function get_neighbors(r, c) {
  let n = [];

  for (neighbor in neighbors_delta) {
    let new_r = r + neighbor[0];
    let new_c = c + neighbor[1];

    if ((new_r >= row) || (new_c >= col) || (new_r < 0) || (new_c < 0)) {
      continue;
    }

    n.push((new_r, new_c, neighbor[2]));
  }
  console.log(n);
  return n;
}

//depth first search
function dfs(r, c, visited, trie, curr_word, direction) {
  if ((r, c) in visited) {
    return;
  }

  let letter = grid[r][c];
  visited.push((r, c));
  //console.log(visited);

  if (letter in trie) {
    curr_word += letter;
    console.log(curr_word);

    if (trie[letter]['valid']) {
      console.log('Found ${curr_word} ${direction}');
      solutions.push(curr_word);
      console.log(solutions);
    }

    let neighbors = get_neighbors(r, c);
    for (n in neighbors) {
      dfs(n[0], n[1], visited[start, end], trie[letter], curr_word, direction + ' ' + n[2]);
    }
  }
}

function main(trie_node) {
  trie_node = build_trie(dictionary, trie_node);

  console.log("Given board:");
  for (let i = 0; i < row; i++) {
    console.log(grid[i]);
  }
  console.log('\n');

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      letter = grid[r][c];
      dfs(r, c, [], trie_node, '', 'directions from ${r}, ${c} ${letter} go ');
    }
  }
}

console.log(main(trie_node));
