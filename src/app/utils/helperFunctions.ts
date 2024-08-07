export function formatNumber(marketCap: number | string) {
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;

  // Convert marketCap to number if it's a string
  const marketCapNumber =
    typeof marketCap === "string" ? parseFloat(marketCap) : marketCap;

  // Check if marketCapNumber is a valid number
  if (isNaN(marketCapNumber) || !isFinite(marketCapNumber)) {
    return marketCap; // Return original value if it's not a valid number
  }

  // Function to extract integer and two digits after decimal
  function sumIntegerAndDecimalParts(numberAsString: string): number | null {
    const match = numberAsString.match(/^(\d+)\.(\d{2})/);
    if (match) {
      const integerPart = parseInt(match[1], 10);
      const decimalPart = parseInt(match[2], 10);
      const result = integerPart + decimalPart / 100;
      return result;
    } else {
      return null;
    }
  }

  // Format marketCap based on size
  if (marketCapNumber >= trillion) {
    return (marketCapNumber / trillion).toFixed(2) + " T";
  } else if (marketCapNumber >= billion) {
    return (marketCapNumber / billion).toFixed(2) + " B";
  } else if (marketCapNumber >= million) {
    return (marketCapNumber / million).toFixed(2) + " M";
  } else {
    // If marketCapNumber is less than million, use sumIntegerAndDecimalParts
    const marketCapAsString = marketCapNumber.toFixed(2); // Ensure two decimal places
    const formattedNumber = sumIntegerAndDecimalParts(marketCapAsString);
    return formattedNumber !== null
      ? formattedNumber.toFixed(2)
      : marketCapNumber.toFixed(2);
  }
}

export function capitalizeFirstLetter(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    let truncatedStr = str.substring(0, maxLength - 3);
    if (truncatedStr.endsWith("-")) {
      truncatedStr = truncatedStr.slice(0, -1);
    }
    return truncatedStr + "...";
  }
  return str;
}

export function addCommas(x: any) {
  x = x?.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getChartLabels(days: number, milliseconds: number) {
  if (days === 1) {
    let minutes: string | number = (milliseconds / (1000 * 60)) % 60;
    let hours: string | number = (milliseconds / (1000 * 60 * 60)) % 24;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return (
      Math.floor(+hours) + ":" + String(Math.floor(+minutes)).padStart(2, "0")
    );
  } else {
    const d = new Date(milliseconds);
    const currentMonth = month[d.getMonth()];
    const currentDate = d.getDate();
    return `${currentMonth.slice(0, 3)} ${currentDate}`;
  }
}
export function beforeFit(axis: any) {
  const labels = axis.chart.config._config.data.labels;
  const length = labels.length - 1;
  axis.ticks.push({ value: length, label: labels[length] });
}

export const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 5,
  hitRadius: 30,
  hoverRadius: 12,
  scales: {
    y: {
      display: false, // Hide Y-axis values
      ticks: {
        display: false,
      },
    },
    x: {
      display: true,
      beforeFit: beforeFit,
      ticks: {
        maxTicksLimit: 7,
        color: "#9B9AB6",
        fontSize: 8,
        align: "inner",
        padding: 0,
      },
      grid: {
        display: false, // Hide grid lines on X-axis
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function chartData(
  chartLabels: any[],
  labelOne: string,
  dataOne: any[],
  coinOneName?: string
) {
  const label = coinOneName
    ? capitalizeFirstLetter(coinOneName)
    : capitalizeFirstLetter(labelOne);
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: label,
        data: dataOne,
        borderColor: "#7878FA",
        borderWidth: 3,
        borderRadius: 3,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#7878FA");
          gradient.addColorStop(0.65, "rgba(120, 120, 250, 0)");
          return gradient;
        },
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  return data;
}

export const getTodaysDate = () => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const today = new Date();
  const formattedDate = formatDate(today);
  return formattedDate;
};

export const colors = [
  "#C27721",
  "#6374C3",
  "#30E0A1",
  "#F5AC37",
  "#F3EB2F",
  "#638FFE",
  "#4DEEE5",
  "#F06142",
  "#5082CF",
  "#00B1A7",
  "#FE2264",
  "#FFA500",
  "#6374C3",
  "#FFA500",
  "#FFD700",
  "#FF6347",
  "#FF0000",
];

export function formatMonthAndTime(milliseconds: number) {
  const d = new Date();
  const time = new Date(d.getTime() - milliseconds);
  const currentMonth = month[time.getMonth()];
  const currentDate = time.getDate();
  const hour = String(time.getHours()).padStart(2, "0");
  return `${currentMonth.slice(0, 3)} ${currentDate},${hour}:00 `;
}
