/**
 * The chart gallery: every chart in src/components/charts/, by type, in the order its page shows
 * them. scripts/build-registry.mts reads it too, so each chart is a registry item of its own; a
 * new chart gets a line here and a place on its type's page.
 */

export type ChartEntry = {
  name: string;
  title: string;
  /** For the registry, in English. */
  description: string;
  /** Takes a whole row of the gallery: the charts with a control of their own. */
  wide?: boolean;
  /** zzzUI items it uses beyond the chart and the card. */
  deps?: string[];
};

export type ChartType = {
  type: "area" | "bar" | "line" | "pie" | "radar" | "radial" | "tooltip";
  /** Shown on the overview. */
  featured: string;
  line: { en: string; zh: string };
  charts: ChartEntry[];
};

export const CHART_TYPES: ChartType[] = [
  {
    type: "area",
    featured: "chart-area-gradient",
    line: {
      en: "Curves, steps, stacks, gradients, a range to pick",
      zh: "曲线、阶梯、堆叠、渐变，以及可切换的时间范围",
    },
    charts: [
      {
        name: "chart-area-interactive",
        title: "Area chart, interactive",
        description:
          "A wide area chart over thirty days with two stacked gradient series, a legend, and a select that narrows the range to 30, 14 or 7 days.",
        wide: true,
        deps: ["select"],
      },
      {
        name: "chart-area-default",
        title: "Area chart",
        description:
          "An area chart with one series on a smooth curve, filled below, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-linear",
        title: "Area chart, linear",
        description:
          "An area chart with one series drawn in straight lines from point to point.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-step",
        title: "Area chart, step",
        description:
          "An area chart with one series drawn in steps, each value holding until the next.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-stacked",
        title: "Area chart, stacked",
        description:
          "An area chart with two series stacked, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-stacked-expand",
        title: "Area chart, stacked to 100%",
        description:
          "An area chart with three series stacked and stretched to full height, so each band shows its share as a percentage.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-gradient",
        title: "Area chart, gradient",
        description:
          "An area chart with two series, each filled with a gradient fading to transparent.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-legend",
        title: "Area chart, legend",
        description:
          "An area chart with two series stacked and a legend naming them.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-area-axes",
        title: "Area chart, axes",
        description:
          "An area chart with two series stacked and both the X and Y axes shown.",
        deps: ["icon-chevron-up"],
      },
    ],
  },
  {
    type: "bar",
    featured: "chart-bar-multiple",
    line: {
      en: "Upright and sideways, grouped, stacked, labelled, below zero",
      zh: "纵向与横向、分组、堆叠、标签，以及负值",
    },
    charts: [
      {
        name: "chart-bar-interactive",
        title: "Bar chart, interactive",
        description:
          "A bar chart over thirty days with a toggle in the header that picks which of two series is drawn, each showing its total.",
        wide: true,
        deps: ["toggle-group"],
      },
      {
        name: "chart-bar-default",
        title: "Bar chart",
        description:
          "A bar chart with one series, a bar a month, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-horizontal",
        title: "Bar chart, horizontal",
        description:
          "A bar chart laid on its side, the months down the left, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-multiple",
        title: "Bar chart, multiple",
        description:
          "A bar chart with two series side by side, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-stacked",
        title: "Bar chart, stacked",
        description:
          "A bar chart with two series stacked and a legend, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-label",
        title: "Bar chart, label",
        description:
          "A bar chart with each bar's value written above it, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-label-custom",
        title: "Bar chart, custom label",
        description:
          "A horizontal bar chart with each name written in ink inside its bar and the value past its end.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-negative",
        title: "Bar chart, negative",
        description:
          "A bar chart that goes below zero, gains in the accent and losses in red, each bar labelled with its value.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-mixed",
        title: "Bar chart, mixed",
        description:
          "A horizontal bar chart with a colour of its own for every bar, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-bar-active",
        title: "Bar chart, active",
        description:
          "A bar chart with one bar marked by a dashed ink outline and the others dimmed.",
        deps: ["icon-chevron-up"],
      },
    ],
  },
  {
    type: "line",
    featured: "chart-line-dots",
    line: {
      en: "Curves, steps, several series, dots and labels",
      zh: "曲线、阶梯、多条数据系列、数据点与标签",
    },
    charts: [
      {
        name: "chart-line-interactive",
        title: "Line chart, interactive",
        description:
          "A line chart over thirty days with a toggle in the header that picks which of two series is drawn, each showing its total.",
        wide: true,
        deps: ["toggle-group"],
      },
      {
        name: "chart-line-default",
        title: "Line chart",
        description:
          "A line chart with one series drawn as a smooth curve, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-linear",
        title: "Line chart, linear",
        description:
          "A line chart with one series drawn in straight segments from point to point.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-step",
        title: "Line chart, step",
        description:
          "A line chart with one series drawn in steps that hold flat until the next point.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-multiple",
        title: "Line chart, multiple",
        description:
          "A line chart with two series, one line each, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-dots",
        title: "Line chart, dots",
        description:
          "A line chart with a dot on every point and a bigger dot on the point under the pointer.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-dots-colors",
        title: "Line chart, coloured dots",
        description:
          "A line chart over categories where each dot takes its own row's colour through a custom dot.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-label",
        title: "Line chart, label",
        description: "A line chart with each point's value written above it.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-line-label-custom",
        title: "Line chart, custom label",
        description:
          "A line chart where each point is labelled with its row's name, looked up in the config.",
        deps: ["icon-chevron-up"],
      },
    ],
  },
  {
    type: "pie",
    featured: "chart-pie-donut-text",
    line: {
      en: "Pies and donuts, labels, a slice raised, the total inside",
      zh: "饼图与环形图、标签、突出的扇区、居中的总数",
    },
    charts: [
      {
        name: "chart-pie-simple",
        title: "Pie chart",
        description:
          "A pie chart of five kinds, a slice each in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-label",
        title: "Pie chart, label",
        description:
          "A pie chart with each slice's value written beside it on a short line.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-label-list",
        title: "Pie chart, named slices",
        description:
          "A pie chart with each slice's name written inside it in ink.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-legend",
        title: "Pie chart, legend",
        description:
          "A pie chart with a legend under it that wraps onto a second row when space runs out.",
      },
      {
        name: "chart-pie-donut",
        title: "Pie chart, donut",
        description:
          "A donut chart: a pie with its middle cut out, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-donut-active",
        title: "Pie chart, donut, one slice raised",
        description:
          "A donut chart with one slice drawn larger than the rest to point at it.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-donut-text",
        title: "Pie chart, donut with total",
        description:
          "A donut chart with the total written large in its middle and what it counts beneath.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-stacked",
        title: "Pie chart, two rings",
        description:
          "Two pies in one: this month inside and last month as a ring around it.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-pie-interactive",
        title: "Pie chart, interactive",
        description:
          "A donut chart with a select in the header that picks a month, raises its slice and shows its value in the middle.",
        deps: ["select"],
      },
    ],
  },
  {
    type: "radar",
    featured: "chart-radar-multiple",
    line: {
      en: "Stats as a shape: filled or outlined, two compared, grids",
      zh: "以形状呈现属性：填充或描边、双组对比、多种网格",
    },
    charts: [
      {
        name: "chart-radar-default",
        title: "Radar chart",
        description:
          "A radar chart of one courier's six stats, the shape filled, in zzzUI's colours.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-dots",
        title: "Radar chart, dots",
        description: "A filled radar chart with a dot on every stat.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-lines-only",
        title: "Radar chart, lines only",
        description:
          "A radar chart of two couriers drawn as outlines, with no fill.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-multiple",
        title: "Radar chart, multiple",
        description:
          "A radar chart of two couriers, both filled, the second laid over the first and see-through.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-grid-circle",
        title: "Radar chart, round grid",
        description:
          "A filled radar chart with dots, on a grid of rings instead of hexagons.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-grid-filled",
        title: "Radar chart, filled grid",
        description:
          "A radar chart on a round grid filled with the raised surface colour.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-grid-none",
        title: "Radar chart, no grid",
        description:
          "A radar chart with no grid: just the shape, its dots and the stat names.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-legend",
        title: "Radar chart, legend",
        description:
          "A radar chart of two couriers with a legend naming each shape.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radar-label-custom",
        title: "Radar chart, custom label",
        description:
          "A radar chart of two couriers whose stat labels show both couriers' scores in their own colours.",
        deps: ["icon-chevron-up"],
      },
    ],
  },
  {
    type: "radial",
    featured: "chart-radial-text",
    line: {
      en: "Rings, labels, a grid, a number in the middle",
      zh: "圆环、标签、网格，以及居中的数值",
    },
    charts: [
      {
        name: "chart-radial-simple",
        title: "Radial chart",
        description:
          "A radial bar chart: five districts as rings, each in its own colour, on a raised track.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radial-label",
        title: "Radial chart, label",
        description:
          "A radial bar chart with each district's name written where its ring starts.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radial-grid",
        title: "Radial chart, grid",
        description:
          "A radial bar chart on a circular grid, one ring per district.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radial-text",
        title: "Radial chart, text",
        description:
          "A single-ring progress chart towards a target, with the count written large in the middle.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radial-shape",
        title: "Radial chart, shape",
        description:
          "One open ring around a filled disc, with the number in the middle.",
        deps: ["icon-chevron-up"],
      },
      {
        name: "chart-radial-stacked",
        title: "Radial chart, stacked",
        description:
          "A half-ring radial bar chart with two series stacked and the total in the middle.",
        deps: ["icon-chevron-up"],
      },
    ],
  },
  {
    type: "tooltip",
    featured: "chart-tooltip-default",
    line: {
      en: "Indicators, labels, formatters and icons",
      zh: "指示标记、标签、数值格式化与图标",
    },
    charts: [
      {
        name: "chart-tooltip-default",
        title: "Chart tooltip",
        description:
          "A stacked bar chart whose tooltip shows the day as its label and a block swatch for each series.",
      },
      {
        name: "chart-tooltip-indicator-line",
        title: "Chart tooltip, line indicator",
        description:
          "A stacked bar chart whose tooltip marks each series with a thin line instead of a block.",
      },
      {
        name: "chart-tooltip-indicator-none",
        title: "Chart tooltip, no indicator",
        description:
          "A stacked bar chart whose tooltip shows names and values with no swatch.",
      },
      {
        name: "chart-tooltip-label-custom",
        title: "Chart tooltip, custom label",
        description:
          "A stacked bar chart whose tooltip label comes from a config entry through labelKey.",
      },
      {
        name: "chart-tooltip-label-formatter",
        title: "Chart tooltip, label formatter",
        description:
          "A stacked bar chart whose tooltip label is formatted from the short day into a full date.",
      },
      {
        name: "chart-tooltip-formatter",
        title: "Chart tooltip, formatter",
        description:
          "A stacked bar chart whose tooltip rows are drawn by a formatter, with a unit on each value and a total row.",
      },
      {
        name: "chart-tooltip-icons",
        title: "Chart tooltip, icons",
        description:
          "A stacked bar chart whose tooltip shows an icon from the config beside each series.",
        deps: ["icon-crate", "icon-flare"],
      },
    ],
  },
];
