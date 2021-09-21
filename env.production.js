window.env = {
  contentServerVersion: "5.10.x",
  contentServerUrl: "https://activepivot-ranch.activeviam.com:5100",
  // WARNING: Changing the keys of activePivotServers will break previously saved widgets and dashboards.
  // If you must do it, then you also need to update each one's serverKey attribute on your content server.
  activePivotServers: {
    "Ranch 5.10": {
      url: "https://activepivot-ranch.activeviam.com:5100",
      version: "5.10.0",
    },
    // You can connect to as many servers as needed.
    // In practice most projects only need one.
    "Ranch 5.9": {
      url: "https://activepivot-ranch.activeviam.com:5900",
      version: "5.9.4",
    },
  },
};
