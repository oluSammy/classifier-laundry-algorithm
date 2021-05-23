/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  // return if input is not an array or array length is less than 1
  if (!Array.isArray(input)) {
    throw Error;
  }
  if (!input.length) {
    return { noOfGroups: 0 };
  }

  const newArr = [...input];

  // calculate age of students
  const modifiedArray = newArr.map((element) => ({
    name: element.name,
    age: calcAge(element.dob),
    regNo: element.regNo,
    dob: element.dob,
  }));

  // sort array by age
  const sortedArray = modifiedArray.sort(function (a, b) {
    return a.age - b.age;
  });

  //initialize 1st group with the first student in the sorted array
  let group = [sortedArray[0]];
  let studentGroup = [];

  // sort group by age difference and group length
  for (let i = 1; i < modifiedArray.length; i++) {
    if (sortedArray[i].age - group[0].age <= 5 && group.length <= 2) {
      group.push(modifiedArray[i]);
    } else {
      studentGroup.push(group);
      group = [];
      group.push(modifiedArray[i]);
    }
  }

  // last group
  if (group.length) {
    studentGroup.push(group);
  }

  // set noOfGroups key
  let output = {};
  output.noOfGroups = studentGroup.length;

  // format groups based on output requirement
  const groupOutput = studentGroup.map(function (group) {
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

  // set output key for each group
  groupOutput.forEach((group, idx) => {
    let currentGroup = `group${idx + 1}`;
    output = { ...output, [currentGroup]: group };
  });

  return output;
}

// function to calculate age
const calcAge = (year) => {
  const date = new Date(year);
  return new Date(2019, 0, 1).getFullYear() - new Date(year).getFullYear()
};
console.log(classifier([
  {
    name: 'Hendrick',
    dob: '1853-07-18T00:00:00.000Z',
    regNo: '041',
  },
  {
    name: 'Albert',
    dob: '1879-03-14T00:00:00.000Z',
    regNo: '033',
  },
  {
    name: 'Marie',
    dob: '1867-11-07T00:00:00.000Z',
    regNo: '024',
  },
  {
    name: 'Neils',
    dob: '1885-10-07T00:00:00.000Z',
    regNo: '02',
  },
  {
    name: 'Max',
    dob: '1858-04-23T00:00:00.000Z',
    regNo: '014',
  },
  {
    name: 'Erwin',
    dob: '1887-08-12T00:00:00.000Z',
    regNo: '09',
  },
  {
    name: 'Auguste',
    dob: '1884-01-28T00:00:00.000Z',
    regNo: '08',
  },
  {
    name: 'Karl',
    dob: '1901-12-05T00:00:00.000Z',
    regNo: '120',
  },
  {
    name: 'Louis', //
    dob: '1892-08-15T00:00:00.000Z',
    regNo: '022',
  },
  {
    name: 'Arthur',
    dob: '1892-09-10T00:00:00.000Z',
    regNo: '321',
  },
  {
    name: 'Paul',
    dob: '1902-08-08T00:00:00.000Z',
    regNo: '055',
  },
  {
    name: 'William',
    dob: '1890-03-31T00:00:00.000Z',
    regNo: '013',
  },
  {
    name: 'Owen',
    dob: '1879-04-26T00:00:00.000Z',
    regNo: '052',
  },
  {
    name: 'Martin',
    dob: '1871-02-15T00:00:00.000Z',
    regNo: '063',
  },
  {
    name: 'Guye',
    dob: '1866-10-15T00:00:00.000Z',
    regNo: '084',
  },
  {
    name: 'Charles',
    dob: '1868-02-14T00:00:00.000Z',
    regNo: '091',
  },
]))
module.exports = classifier;
