/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {

  // get pairs in clean pile
  const { unpairedNo, totalPair } = findPair(cleanPile);

  // get pairs by comparing unpaired colors in clean pile with dirty pile
  const {
    washes,
    newTotalPair,
    unpairedNo: newUnpairedNo,
  } = findCleanPairInDirtyPile(unpairedNo, dirtyPile, noOfWashes);

  if (washes >= noOfWashes) {
    return newTotalPair + totalPair;
  } else {
    const { totalPair: newTotalPair1 } = findLastPair(
      newUnpairedNo,
      noOfWashes,
      washes,
    );
    return newTotalPair + totalPair + newTotalPair1;
  }
}

module.exports = getMaxPairs;


// function to find pairs in clean pile
const findPair = (arr) => {
  const copy = [];

  // find pairs
  for (i = 0; i < arr.length; i++) {
    for (j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        const foundEl = copy.find((el) => el.num === arr[j]);
        if (foundEl) {
          foundEl.pair++;
        } else {
          copy.push({ num: arr[j], pair: 1 });
        }
        arr.splice(j, 1);
        break;
      }
    }
  }

  //get number that was paired
  const pairedNos = [];
  copy.forEach((el) => pairedNos.push(el.num));

  //get number that was not paired
  const unpairedNo = arr.filter((el) => !pairedNos.includes(el));
  const totalPair = copy.reduce((acc, currentValue) => {
    return acc + currentValue.pair;
  }, 0);

  //get spare number that was paired
  copy.forEach((el) => {
    let count = 0;
    arr.forEach((dirtyPileEl) => {
      if (dirtyPileEl === el.num) {
        count++;
      }
    });
    const newCount = count - el.pair;
    for (i = 0; i < newCount; i++) {
      unpairedNo.push(el.num);
    }
  });
  return { copy, pairedNos, unpairedNo, totalPair };
};


// function to find pairs in clean pile and dirty pile
const findCleanPairInDirtyPile = (cleanPile, dirtyPile, noOfWashes) => {
  let washes = 0;
  const copy = [];
  const unpaired = [];

  // find pairs
  for (i = 0; i < cleanPile.length; i++) {
    if (washes < noOfWashes) {
      for (j = 0; j < dirtyPile.length; j++) {
        if (cleanPile[i] === dirtyPile[j]) {
          washes++;
          const foundEl = copy.find((el) => el.num === dirtyPile[j]);
          if (foundEl) {
            foundEl.pair++;
          } else {
            copy.push({ num: dirtyPile[j], pair: 1 });
          }
          dirtyPile.splice(j, 1);
          break;
        }
      }
    }
  }
  const pairedNos = [];
  copy.forEach((el) => pairedNos.push(el.num));
  const unpairedNo = dirtyPile.filter((el) => !pairedNos.includes(el));
  const newTotalPair = copy.reduce((acc, currentValue) => {
    return acc + currentValue.pair;
  }, 0);
  //get spare number that was paired
  copy.forEach((el) => {
    let count = 0;
    dirtyPile.forEach((dirtyPileEl) => {
      if (dirtyPileEl === el.num) {
        count++;
      }
    });
    const newCount = count - el.pair;
    for (i = 0; i <= newCount; i++) {
      unpairedNo.push(el.num);
    }
  });
  return { washes, newTotalPair, copy, pairedNos, unpairedNo, unpaired };
};


// function to find pairs in dirty pile
const findLastPair = (arr, noOfWashes, oldWashes) => {
  const copy = [];
  let washes = oldWashes;
  for (i = 0; i < arr.length; i++) {
    if (washes < noOfWashes && noOfWashes - washes !== 1) {
      for (j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          washes = washes + 2;
          const foundEl = copy.find((el) => el.num === arr[j]);
          if (foundEl) {
            foundEl.pair++;
          } else {
            copy.push({ num: arr[j], pair: 1 });
          }
          arr.splice(j, 1);
          break;
        }
      }
    }
  }
  const pairedNos = [];
  copy.forEach((el) => pairedNos.push(el.num));
  const unpairedNo = arr.filter((el) => !pairedNos.includes(el));
  const totalPair = copy.reduce((acc, currentValue) => {
    return acc + currentValue.pair;
  }, 0);

  //get spare number that was paired
  copy.forEach((el) => {
    let count = 0;
    arr.forEach((dirtyPileEl) => {
      if (dirtyPileEl === el.num) {
        count++;
      }
    });
    const newCount = count - el.pair;
    for (i = 0; i < newCount; i++) {
      unpairedNo.push(el.num);
    }
  });
  return { copy, pairedNos, unpairedNo, totalPair };
};
