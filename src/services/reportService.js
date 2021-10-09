export const prepareAgeChart = (data) => {
  let ageGroups = [
    { name: "13-18", count: 0 },
    { name: "18-25", count: 0 },
    { name: "25+", count: 0 }
  ];

  data.forEach((each) => {
    if (each.age >= 13 && each.age <= 18) {
      ageGroups[0].count++;
    } else if (each.age >= 18 && each.age <= 25) {
      ageGroups[1].count++;
    } else {
      ageGroups[2].count++;
    }
  });
  return ageGroups;
};
export const prepareAverageGroupSizeCard = (data) => {
  let averageGroupSize = 0;
  let totalAttendees = data.length;
  let guestsCount = 0;
  data.forEach((each) => (guestsCount += Number(each.guests)));
  averageGroupSize = guestsCount / totalAttendees;
  return Math.round(averageGroupSize);
};
export const prepareTotalSizeCard = (data) => {
  let totalAttendees = data.length;
  let totalguestsCount = 0;
  data.forEach((each) => (totalguestsCount += Number(each.guests)));
  return {
    totalAttendees,
    totalguestsCount,
    total: totalAttendees + totalguestsCount
  };
};

export const prepareLocalityChart = (data) => {
  let localityGroup = {};

  let localityResult = [];
  data.forEach((each) => {
    if (localityGroup[each.locality]) {
      localityGroup[each.locality]++;
    } else {
      localityGroup[each.locality] = 1;
    }
  });

  for (let [key, value] of Object.entries(localityGroup)) {
    localityResult.push({ name: key, count: value });
  }

  return localityResult;
};
export const prepareProfessionChart = (data) => {
  let professionGroup = [
    { name: "Employed", count: 0 },
    { name: "Student", count: 0 }
  ];

  data.forEach((each) => {
    each.profession === "employed"
      ? professionGroup[0].count++
      : professionGroup[1].count++;
  });
  return professionGroup;
};
export const chartService = {
  prepareAgeChart: prepareProfessionChart,
  prepareAverageGroupSizeCard: prepareAverageGroupSizeCard,
  prepareLocalityChart: prepareLocalityChart,
  prepareProfessionChart: prepareProfessionChart,
  prepareTotalSizeCard: prepareTotalSizeCard
};
