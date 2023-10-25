// TODO: convert to ESM

const {HttpsError} = require("firebase-functions/v2/identity");
const {beforeUserCreated} = require("firebase-functions/v2/identity");
const {onRequest} = require("firebase-functions/v2/https");

module.exports.monitorUserCreation = beforeUserCreated((e) => {
  const [entryNo, provider] = e.data.email.split("@");

  // Reject all non-organisational email ids
  if (provider !== "smvdu.ac.in") {
    throw new HttpsError("permission-denied",
        `Non-SMVDU email. Provider: ${provider}.`);
  }

  // Only accept student email ids
  const entryNoRegex = new RegExp(
      "(\\d{2})" + // First two digits indicate the batch's year
      "([a-z])" + // The next letter indicates the degree
      "([a-z]{2})" + // The next two letters show the specilization
      "(\\d{3})", // The last three numbers show the roll number
      "i",
  );

  let [, year, degree, branch, rollNo] = entryNoRegex.exec(entryNo) || [];

  if (!year || !degree || !branch || !rollNo) {
    throw new HttpsError("permission-denied",
        `Entry number pattern mismatch. \
        Entry number: ${year}, ${degree}, ${branch}, ${rollNo}.`);
  }

  year = parseInt(year) + 2000;

  const branchMap = {
    cs: "Computer Science and Engineering",
    ec: "Electronics and Communications Engineering",
    ee: "Electrical Engineering",
    me: "Mechanical Engineering",
    ce: "Civil Engineering",
  };

  const degreeMap = {
    b: "Bachelor",
  };

  const graduationDuration = {
    bcs: 4,
  };

  return {
    // Add user info
    displayName: e.data.displayName.replaceAll(entryNo, "").trim(),
    customClaims: {
      studentInfo: {
        year,
        degree: degreeMap[degree],
        branch: branchMap[branch],
        rollNo: parseInt(rollNo),
        graduationDuration: year + graduationDuration[degree + branch],
        entryNo,
      },
    },
  };
});

// Server-side rendering
let ssrServer;
module.exports.ssr = onRequest(async (request, response) => {
  if (!ssrServer) {
    ssrServer = require("./ssr/index").default;
  }
  return ssrServer(request, response);
});
