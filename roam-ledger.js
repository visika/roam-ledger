// Find all the blocks that reference accountName
function listExpenses(accountName) {
  return window.roamAlphaAPI.q('[:find (pull ?referencingBlock [*]) :in $ ?pagetitle :where [?referencingBlock :block/refs ?referencedPage] [?referencedPage :node/title ?pagetitle] ]', accountName);
}

// Let's try with e.g. Food expenses
// Only positive values, i.e. single entry ledger
// I really wish to get a double entry ledger sometime!
var thelist = listExpenses("Food");
var i;
var sum = 0;
// Let's search for all the expenses in our graph
for (i=0; i<thelist.length; i++) {
    // thestring is the text of the block that references Food
    // There might be better ways to prevent false positives,
    // like nesting entries under a Transaction block.
    var thestring = thelist[i][0].string;
    console.log("String: " + thestring);
    // Quick hack: deletes everything other than numbers.
    // It's not ideal, as we lose the minus sign.
    // Roadblock to double entry accounting.
    var thenum = Number(thestring.replace( /^\D+/g, ''));
    console.log("Match: " + thenum);
    sum += thenum;
}
// Just printing this in the console.
// I wish I knew how to create those fancy {{ledger}} blocks.
// It might not just print a value, but generate a interactive dashboard
// like {{chart}} does. See fava webclient for beancount.
console.log("Expenses in Food: " + sum);
