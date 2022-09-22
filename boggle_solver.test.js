const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}


describe("Boggle Solver Tests Suite:", () => { 
  
  // 1. normal input
  describe("Normal input", () => {

    // 2x2 grid 
    test("2x2 case", () => {
      let grid = [
        ["C", "E"],
        ["A", "T"]
      ];
      let dictionary = ["CAT", "CEA", "TEA", "CT"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["CAT", "CEA", "TEA"];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

    // 3x3 grid
    test("3x3 case", () => {
      let grid = [
        ["C", "E", "D"],
        ["U", "K", "H"],
        ["A", "T", "I"]
      ];
      let dictionary = ["HIT", "AT", "HIKE", "CUT"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["HIT", "HIKE", "CUT"];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

    // 4x4 grid
    test("4x4 case", () => {
      let grid = [
        ["E", "L", "V", "G"],
        ["H", "I", "I", "N"],
        ["I", "N", "St", "A"],
        ["A", "P", "B", "St"]
      ];
      let dictionary = ["LIVING", "PIN", "STAIN", "BANG", "BAN", 
        "LIST", "PAIN", "IN", "HI", "GAIN", "PLAN", "PLAIN", "HEAL", 
        "HEAP", "BEAN", "LEAN", "LEAP", "VISTA", "STING", "GIN", "NAP", 
        "HIP", "VILE", "STAB", "PAN", "LIP", "NAB"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["LIVING", "STAIN", "BANG", "BAN", "NAB", 
        "LIST", "NAP", "PIN", "PAIN", "VISTA", "STING", "GIN", 
        "HIP", "VILE", "STAB", "PAN"];
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      
      expect(solutions.sort()).toEqual(expected.sort());
    });

    // 5x5 grid
    test("5x5 case", () => {
      let grid = [
        ["N", "C", "I", "A", "O"],
        ["Y", "E", "I", "T", "H"],
        ["Z", "N", "L", "C", "P"],
        ["A", "L", "A", "D", "M"],
        ["D", "F", "L", "L", "L"]
      ];
      let dictionary = ["ALL", "FALL", "ICE", "LANE", "FAD", "HOT", 
        "YEN", "ZEN", "POINT", "LAD", "CALL", "CELL", "CANE", "TIE", 
        "TAIL", "DAINTY", "PAINT", "PAINTED", "HOTEL", "MOTEL", "LADY", 
        "YETI", "MALL", "MAIL", "MAILED", "PLANET", "PLAID", "AT", "LATE", "OH"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["ALL", "FALL", "ICE", "LANE", "FAD", "HOT", 
        "YEN", "ZEN", "LAD", "CALL", "CANE", "CELL", "TIE", "TAIL"];
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  // 2. problem constraints
  describe("Problem constraints", () => {

    // QU
    test("QU case", () => {
      let grid = [
        ["N", "Qu", "R"],
        ["Y", "E", "I"],
        ["Z", "T", "L"]
      ];
      let dictionary = ["NET", "QUILT", "YET", "LET", "ZINE", "YEN", 
        "YETI", "LINE", "TIRE", "TIER", "QUERY", "LINT", "TINY", "TEN", 
        "QUITE", "QUIT", "QUIET", "LIT", "LIE", "TILE", "ZEN"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["NET", "YET", "LET", "YEN", "YETI", "QUILT", "TEN", 
        "QUITE", "QUIT", "QUIET", "TIRE", "TIER", "LIT", "LIE", "TILE", "ZEN"];
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      
      expect(solutions.sort()).toEqual(expected.sort());
    });

    // ST
    test("ST case", () => {
      let grid = [
        ["O", "N", "E"],
        ["St", "R", "M"],
        ["B", "A", "P"]
      ];
      let dictionary = ["ONE", "ORE", "MEN", "MEAN", "MAN", "ORB", "STORE", 
        "STONE", "STORM", "STAR", "STARE", "STAB", "NOR", "NOPE", 
        "ARM", "ARE", "BAR", "BARE", "BAM", "BANE", "PARE", "PEAR", 
        "PERM", "RAM", "RAN", "RAP", "PRONE", "PROBE", "PROM"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["BARE", "ONE", "ORE", "ORB", "STORE", 
        "STONE", "STAR", "STARE", "STAB", "NOR", 
        "ARM", "ARE", "BAR", "BAM", "MEN", "PARE", "RAM", 
        "RAP", "PRONE", "STORM"];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

  });

  // 3. input edge cases
  describe("Input edge cases:", () => {
    // Empty case
    test("Empty case", () => {
      let grid = [];
      let dictionary = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = [];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

    // Invalid input
    test("NxM case", () => {
      let grid = [
        ["C", "I", "D", "R"],
        ["O", "T", "A", "C"],
        ["Y", "N", "B", "E"]
      ];
      let dictionary = ["CITY", "CON", "COY", "DAB", "DAINTY", "RAN", 
        "RED", "BAD", "BAND", "RABID", "RICE", "BEAN", "TOY", "RABID", "RANT"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = [];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

    // Duplicates
    test("Duplicate letters case", () => {
      let grid = [
        ["A", "B"],
        ["A", "C"]
      ];
      let dictionary = ["AB", "ABA", "ACA", "BAC", "AA", "AC", 
        "ABC", "ACB", "BA", "CA", "CAB"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["ABA", "ACA", "BAC", "ABC", "ACB", "CAB"];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

    // Grid with no valid words
    test("Empty dictionary", () => {
      let grid = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
      ];
      let dictionary = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = [];

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);

      expect(solutions.sort()).toEqual(expected.sort());
    });

  });

});

