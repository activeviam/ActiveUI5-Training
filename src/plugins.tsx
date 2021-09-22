/**
 * This file lists all the plugins from the sdk that are used in the starter application.
 * You will find all the different widgets, context menu items and other features used.
 * This is where you add all your custom plugins.
 * It is also important to note that, should you not need any of the listed plugin, you can also remove it,
 * which will reduce your bundle size and therefore increase performance
 * */


import _keyBy from "lodash/keyBy";
import {
  CellPlugin,
  CellStylePlugin,
  MenuItemPlugin,
  PluginRegistry,
  TitleBarButtonPlugin,
  WidgetPlugin,
  pluginCellPivotTable,
  pluginCellStyleDrillthroughTable,
  pluginCellStylePivotTable,
  pluginCellStyleTable,
  pluginCellTable,
  pluginCellTreeTable,
  pluginMenuItemCopyQuery,
  pluginMenuItemDuplicateWidget,
  pluginMenuItemExportToCsv,
  pluginMenuItemExportDrillthroughToCsv,
  pluginMenuItemFilterOnSelection,
  pluginMenuItemFullScreen,
  pluginMenuItemShowHideTotals,
  pluginMenuItemOpenDrillthrough,
  pluginMenuItemRefreshQuery,
  pluginMenuItemRemoveSort,
  pluginMenuItemRemoveWidget,
  pluginMenuItemSortChartAscendingly,
  pluginMenuItemSortChartDescendingly,
  pluginMenuItemSortDrillthroughTableAscendingly,
  pluginMenuItemSortDrillthroughTableDescendingly,
  pluginMenuItemSortPivotTableAscendingly,
  pluginMenuItemSortPivotTableDescendingly,
  pluginMenuItemSwitchQuickFilterMode,
  pluginTitleBarButtonFullScreen,
  pluginTitleBarButtonRemoveWidget,
  pluginTitleBarButtonToggleQueryMode,
  pluginWidgetDrillthroughTable,
  pluginWidgetKpi,
  pluginWidgetPivotTable,
  pluginWidgetPlotly100StackedAreaChart,
  pluginWidgetPlotly100StackedBarChart,
  pluginWidgetPlotly100StackedColumnChart,
  pluginWidgetPlotlyAreaChart,
  pluginWidgetPlotlyBulletChart,
  pluginWidgetPlotlyClusteredBarChart,
  pluginWidgetPlotlyClusteredColumnChart,
  pluginWidgetPlotlyComboChart,
  pluginWidgetPlotlyDonutChart,
  pluginWidgetPlotlyGaugeChart,
  pluginWidgetPlotlyLineChart,
  pluginWidgetPlotlyPieChart,
  pluginWidgetPlotlyRadarChart,
  pluginWidgetPlotlyScatterPlot,
  pluginWidgetPlotlyStackedAreaChart,
  pluginWidgetPlotlyStackedBarChart,
  pluginWidgetPlotlyStackedColumnChart,
  pluginWidgetPlotlyTreeMap,
  pluginWidgetPlotlyWaterfallChart,
  pluginWidgetQuickFilter,
  pluginWidgetTable,
  pluginWidgetTreeTable,
} from "@activeviam/activeui-sdk";


// plugins used by cell component on table widgets
const cellPlugins: Array<CellPlugin<any>> = [
  pluginCellTable,
  pluginCellPivotTable,
  pluginCellTreeTable,
];

// plugins used to style the cells in table widgets
const cellStylePlugins: Array<CellStylePlugin<any>> = [
  pluginCellStyleTable,
  pluginCellStylePivotTable,
  pluginCellStyleDrillthroughTable,
];

// plugins used in the context menus of widget (defines the actions available in the top right corner of a widget)
const menuItemPlugins: Array<MenuItemPlugin<any, any>> = [
  pluginMenuItemDuplicateWidget,
  pluginMenuItemFullScreen,
  pluginMenuItemFilterOnSelection,
  pluginMenuItemRemoveWidget,
  pluginMenuItemCopyQuery,
  pluginMenuItemRefreshQuery,
  pluginMenuItemExportToCsv,
  pluginMenuItemExportDrillthroughToCsv,
  pluginMenuItemShowHideTotals,
  pluginMenuItemOpenDrillthrough,
  pluginMenuItemRemoveSort,
  pluginMenuItemSortChartAscendingly,
  pluginMenuItemSortChartDescendingly,
  pluginMenuItemSortDrillthroughTableAscendingly,
  pluginMenuItemSortDrillthroughTableDescendingly,
  pluginMenuItemSortPivotTableAscendingly,
  pluginMenuItemSortPivotTableDescendingly,
  pluginMenuItemSwitchQuickFilterMode,
];

// defines the buttons accessible next to the context menu
const titleBarButtonPlugins: Array<TitleBarButtonPlugin<any>> = [
  pluginTitleBarButtonFullScreen,
  pluginTitleBarButtonRemoveWidget,
  pluginTitleBarButtonToggleQueryMode,
];

// defines components that can be used in a dashboard. On the UI they are accessible via the widget ribbons
// Order matters: it controls the order of the icons in the widget ribbons.
// TODO: Ex1 - remove the tree table plugin to remove it from the ribbon
const widgetPlugins: Array<WidgetPlugin<any, any>> = [
  pluginWidgetPivotTable,
  pluginWidgetTable,
  pluginWidgetKpi,
  pluginWidgetPlotlyLineChart,
  pluginWidgetPlotlyAreaChart,
  pluginWidgetPlotlyStackedAreaChart,
  pluginWidgetPlotly100StackedAreaChart,
  pluginWidgetPlotlyStackedColumnChart,
  pluginWidgetPlotlyClusteredColumnChart,
  pluginWidgetPlotly100StackedColumnChart,
  pluginWidgetPlotlyComboChart,
  pluginWidgetPlotlyStackedBarChart,
  pluginWidgetPlotlyClusteredBarChart,
  pluginWidgetPlotly100StackedBarChart,
  pluginWidgetPlotlyPieChart,
  pluginWidgetPlotlyDonutChart,
  pluginWidgetPlotlyScatterPlot,
  pluginWidgetPlotlyRadarChart,
  pluginWidgetPlotlyWaterfallChart,
  pluginWidgetPlotlyBulletChart,
  pluginWidgetPlotlyGaugeChart,
  pluginWidgetPlotlyTreeMap,
  pluginWidgetQuickFilter,
  pluginWidgetDrillthroughTable,
];

// Here we filter the Plotly widget plugins and defines their properties
const plotlyWidgetPlugins = widgetPlugins.filter(({ key }) =>
  key.startsWith("plotly"),
);

plotlyWidgetPlugins.forEach((widgetPlugin) => {
  widgetPlugin.menuItems = [
    pluginMenuItemRemoveWidget.key,
    pluginMenuItemDuplicateWidget.key,
    "save-as",
  ];
  widgetPlugin.titleBarButtons = [
    pluginTitleBarButtonFullScreen.key,
    pluginTitleBarButtonToggleQueryMode.key,
  ];
  widgetPlugin.contextMenuItems = [
    pluginMenuItemFilterOnSelection.key,
    pluginMenuItemOpenDrillthrough.key,
    pluginMenuItemSortChartAscendingly.key,
    pluginMenuItemSortChartDescendingly.key,
    pluginMenuItemRemoveSort.key,
    pluginMenuItemCopyQuery.key,
    pluginMenuItemRefreshQuery.key,
    pluginMenuItemExportToCsv.key,
  ];
});

pluginWidgetTable.cell = pluginCellTable.key;
pluginWidgetTable.cellStyle = pluginCellStyleTable.key;

pluginWidgetPivotTable.cell = pluginCellPivotTable.key;
pluginWidgetPivotTable.cellStyle = pluginCellStylePivotTable.key;

pluginWidgetTreeTable.cell = pluginCellTreeTable.key;
pluginWidgetTreeTable.cellStyle = pluginCellStylePivotTable.key;

// setting properties on table widgets
[pluginWidgetPivotTable, pluginWidgetTreeTable, pluginWidgetTable].forEach(
  (tableWidget) => {
    tableWidget.menuItems = [
      pluginMenuItemRemoveWidget.key,
      pluginMenuItemDuplicateWidget.key,
      "save-as",
    ];
    tableWidget.titleBarButtons = [
      pluginTitleBarButtonFullScreen.key,
      pluginTitleBarButtonToggleQueryMode.key,
    ];
    tableWidget.contextMenuItems = [
      pluginMenuItemFilterOnSelection.key,
      pluginMenuItemOpenDrillthrough.key,
      pluginMenuItemSortPivotTableAscendingly.key,
      pluginMenuItemSortPivotTableDescendingly.key,
      pluginMenuItemRemoveSort.key,
      pluginMenuItemCopyQuery.key,
      pluginMenuItemShowHideTotals.key,
      pluginMenuItemRefreshQuery.key,
      pluginMenuItemExportToCsv.key,
    ];
  },
);

pluginWidgetDrillthroughTable.menuItems = [
  pluginMenuItemRemoveWidget.key,
  pluginMenuItemDuplicateWidget.key,
  "save-as",
];
pluginWidgetDrillthroughTable.titleBarButtons = [
  pluginTitleBarButtonFullScreen.key,
  pluginTitleBarButtonToggleQueryMode.key,
];
pluginWidgetDrillthroughTable.contextMenuItems = [
  pluginMenuItemSortDrillthroughTableAscendingly.key,
  pluginMenuItemSortDrillthroughTableDescendingly.key,
  pluginMenuItemExportDrillthroughToCsv.key,
];
pluginWidgetDrillthroughTable.cellStyle = pluginCellStyleDrillthroughTable.key;

pluginWidgetKpi.menuItems = [
  pluginMenuItemRemoveWidget.key,
  pluginMenuItemDuplicateWidget.key,
  "save-as",
];
pluginWidgetKpi.titleBarButtons = [
  pluginTitleBarButtonFullScreen.key,
  pluginTitleBarButtonToggleQueryMode.key,
];
pluginWidgetKpi.contextMenuItems = [
  pluginMenuItemCopyQuery.key,
  pluginMenuItemRefreshQuery.key,
  pluginMenuItemExportToCsv.key,
];

pluginWidgetQuickFilter.menuItems = [
  pluginMenuItemRemoveWidget.key,
  pluginMenuItemSwitchQuickFilterMode.key,
];
pluginWidgetQuickFilter.titleBarButtons = [pluginTitleBarButtonFullScreen.key];
pluginWidgetQuickFilter.contextMenuItems = [];

export const plugins: PluginRegistry = {
  cell: _keyBy(cellPlugins, "key"),
  "cell-style": _keyBy(cellStylePlugins, "key"),
  "selection-listener": _keyBy([], "key"),
  "menu-item": _keyBy(menuItemPlugins, "key"),
  "titlebar-button": _keyBy(titleBarButtonPlugins, "key"),
  widget: _keyBy(widgetPlugins, "key"),
};
