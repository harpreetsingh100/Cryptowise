import { toast } from "sonner";
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
  if (typeof word !== "string") {
    alert("capitalizeFirstLetter expected a string but received:");
    return "";
  }
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
  const length = labels?.length - 1;
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

export function converterChartOptions(isMobile: boolean) {
  const data = {
    responsive: true,
    maintainAspectRatio: false,
    radius: 5,
    hitRadius: 30,
    hoverRadius: 12,
    scales: {
      y: {
        display: false,
        stacked: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        display: true,
        stacked: true,
        ticks: {
          maxTicksLimit: isMobile ? 6 : 7,
          align: "inner",
        },
        beforeFit(axis: any) {
          const labels = axis.chart.config._config.data.labels;
          const length = labels.length - 1;
          axis.ticks.push({
            value: length,
            label: labels[length],
          });
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return data;
}

export function chartData(
  chartLabels: any[],
  labelOne: string,
  labelTwo: string,
  labelThree: string,
  dataOne: any[],
  dataTwo?: any[],
  dataThree?: any[],
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
      {
        label: capitalizeFirstLetter(labelTwo),
        data: dataTwo && dataTwo,
        borderColor: "#D878FA",
        borderWidth: 3,
        borderRadius: 3,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#D878FA");
          gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
          return gradient;
        },
        pointRadius: 0,
        fill: true,
      },
      {
        label: capitalizeFirstLetter(labelThree),
        data: dataThree && dataThree,
        borderColor: "#ff9e3d",
        borderWidth: 3,
        borderRadius: 3,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#ff9e3d");
          gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Extract year, month, and day, ensuring month and day are two digits
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export function convertDateFormat(dateStr: any) {
  if (!dateStr || !/^\d{2}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid date format. Please use MM-DD-YY.");
  }
  const [month, day] = dateStr.split("-");
  return `${day}-${month}-2024`;
}

export function convertDate(inputDate: any) {
  const parts = inputDate.split(/T|-/); // Split by 'T' or '-'

  return `${parts[1]}-${parts[2]}-${parts[3]}`;
}
export function calculateDifference(
  currentPrice: number,
  purchasePrice: number
): number | string {
  if ((currentPrice - purchasePrice).toFixed(2) == "Infinity") {
    return 0.0;
  }

  return (currentPrice - purchasePrice).toFixed(2);
}

export function calculateSupplyPercentage(
  circulatingSupply: number | undefined,
  maxSupply: number | undefined
): number | undefined {
  if (circulatingSupply && maxSupply && maxSupply !== 0) {
    return (circulatingSupply / maxSupply) * 100;
  }
  return undefined;
}

export function changeDateType(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toUTCString();
  return formattedDate;
}

export const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Link Copied successfully");
  } catch (err) {
    toast.error("Failed to copy text");
  }
};

export function converterChartData(
  chartLabels: any[],
  labelOne: string,
  labelTwo: string,
  dataOne: any[],
  dataTwo: any[]
) {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: labelOne,
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
      {
        label: labelTwo,
        data: dataTwo,
        borderColor: "#D878FA",
        borderWidth: 3,
        borderRadius: 3,
        categoryPercentage: 0.75,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#D878FA");
          gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
          return gradient;
        },
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  return data;
}
