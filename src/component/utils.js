export function formatQuestion(question) {
  let result = "";
  let fields;
  if (question && question.includes("[")) {
    fields = question.split("[");
    result = formatBreakLine(fields[0]);
  } else {
    result = formatBreakLine(question);
  }
  return result;
}

export function formatBreakLine(data) {
  let result = "";
  let fields;

  if (data && data.includes("|")) {
    fields = data.split("|");
    for (let i = 0; i < fields.length; i++) {
      if (i !== fields.length - 1) {
        result = result + fields[i].trim() + `\n\n`;
      } else {
        result = result + fields[i].trim();
      }
    }
  } else {
    result = data;
  }

  result = result.replace("(correct answer)", "");
  result = result.replace("(Correct answer)", "");

  return result;
}


// export function getImage(question) {
//   let result = "";
//   if (question.indexOf("[") === -1) {
//     result = false;
//   } else {
//     let temp1 = question.split("[");
//     let temp2 = temp1[1].split("]");
//     result = "assets/hints/" + temp2[0] + ".gif";
//   }
//   return result;
// }

export function getImage(question) {
  let result = "";

  if (question && question.indexOf("[") !== -1) {
    let temp1 = question.split("[");
    let temp2 = temp1[1].split("]");
    result = "assets/hints/" + temp2[0] + ".gif";
  } else {
    result = false;
  }

  return result;
}

export function getVideo(question) {
  let result = "";

  if (question && question.indexOf("[") !== -1) {
    let temp1 = question.split("[");
    let temp2 = temp1[1].split("]");
    result = "assets/hints/MP4s/" + temp2[0] + ".mp4";
  } else {
    result = false;
  }

  return result;
}

export async function getSubject(key) {
  const filePath = `data/${key}.json`;

  try {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

export async function getOptionsAndHints(key) {
  // const filePath = `../../data/dictionaries/dictionary_${key}.json`;
  const filePath = `data/dictionaries/${key}.json`;
  try {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

export function getDictionaryKey(key) {
  let result = "";
  let fields;

  if (key.includes("_")) {
    fields = key.split("_");
    result = fields[1];
  } else {
    result = key;
  }
  return result;
}

export function getKeyQuestion(id) {
  return `${"KEY_DATA_QUESTIONS" + id}`;
}

export function getCorrectId(options) {
  let correct = 0;
  if (options.length > 0) {
    for (let k = 0; k < options.length; k++) {
      if (options[k].includes("(correct answer)")) {
        correct = options[k].id;
      }
    }
  }
  return correct;
}

export function getCorrectAnswer(options) {
  let correct = 0;
  if (options.length > 0) {
    for (let k = 0; k < options.length; k++) {
      if (typeof options[k] === 'string') {
        if (options[k].includes("(correct answer)") || options[k].includes("(Correct answer)")) {
          correct = options[k]
        }
      } else if (options[k].description &&
        options[k].description.includes("(correct answer)") ||
        options[k].description.includes("(Correct answer)")
      ) {
        correct = options[k];
      }
    }
  }
  return correct;
}

export function arrayMove(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
