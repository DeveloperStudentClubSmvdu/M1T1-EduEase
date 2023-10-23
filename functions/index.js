import {HttpsError} from "firebase-functions/v2/identity";
import {beforeUserCreated} from "firebase-functions/v2/identity";

export const sanitizeUserCreation = beforeUserCreated((e) => {
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

  const [, year, degree, branch, rollNo] = entryNoRegex.exec(entryNo) || [];

  if (!year || !degree || !branch || !rollNo) {
    throw new HttpsError("permission-denied",
        `Entry number pattern mismatch. \
        Entry number: ${year}, ${degree}, ${branch}, ${rollNo}.`);
  }

  return {
    // Add user info
    customClaims: {
      year,
      degree,
      branch,
      rollNo,
      entryNo,
    },
  };
});
