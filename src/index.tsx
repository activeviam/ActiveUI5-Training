import {
  ExtensionModule,
  pluginWidgetPivotTable, pluginWidgetPlotlyLineChart,
} from "@activeviam/activeui-sdk";
import { withSandboxClients } from "@activeviam/sandbox-clients";
import _merge from "lodash/merge";
import { plugins } from "./plugins";

/** defines the first page of the application where
- The withSandboxclients allows user login
- the plugins are registered
- One can register the name of the application
- the initial state of every new dashboard is defined
 */

//TODO: Ex1 - change the Application name to "AUI Training" and change the initialDashboardPageState to include
// a line chart instead of a pivot table
const extension: ExtensionModule = {
  activate: async (configuration) => {
    _merge(configuration.pluginRegistry, plugins);
    configuration.applicationName = "AUI Training";
    configuration.initialDashboardPageState = {
      content: { "0": pluginWidgetPlotlyLineChart.initialState },
      layout: {
        children: [
          {
            leafKey: "0",
            size: 1,
          },
        ],
        direction: "row",
      },
    };
    configuration.higherOrderComponents = [withSandboxClients];
  },
};

export default extension;
