/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  if (!Array.isArray(input)) {
    throw Error;
  }
  if (!input.length) {
    return { noOfGroups: 0 };
  }

  const newArr = [...input];

  const modifiedArray = newArr.map((element) => ({
    name: element.name,
    age: calcAge(element.dob),
    regNo: element.regNo,
    dob: element.dob,
  }));

  const sortedArray = modifiedArray.sort(function (a, b) {
    return a.age - b.age;
  });
  let group = [sortedArray[0]];
  let studentGroup = [];

  for (let i = 1; i < modifiedArray.length; i++) {
    if (sortedArray[i].age - group[0].age <= 5 && group.length <= 2) {
      group.push(modifiedArray[i]);
    } else {
      studentGroup.push(group);
      group = [];
      group.push(modifiedArray[i]);
    }
  }
  if (group.length) {
    studentGroup.push(group);
  }

  let output = {};
  output.noOfGroups = studentGroup.length;

  const groupOutput = studentGroup.map(function (group, index) {
    return {
      members: group.map((el) => ({
        name: el.name,
        age: el.age,
        dob: el.dob,
        regNo: el.regNo,
      })),
      oldest: group[group.length - 1].age,
      sum: group.reduce((acc, el) => {
        return acc + el.age;
      }, 0),
      regNos: group.map(el => (Number(el.regNo))).sort(function(a, b) {
        return a - b
      })
    };
  });

  groupOutput.forEach((group, idx) => {
    let currentGroup = `group${idx + 1}`;
    output = { ...output, [currentGroup]: group };
  });

  return output;
}

const calcAge = (year) => {
  const date = new Date(year);
  return new Date(2019, 0, 1).getFullYear() - new Date(year).getFullYear()
};

module.exports = classifier;
