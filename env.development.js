window.env = {
  contentServerVersion: "5.10.x",
  contentServerUrl: "http://localhost:9090",
  // WARNING: Changing the keys of activePivotServers will break previously saved widgets and dashboards.
  // If you must do it, then you also need to update each one's serverKey attribute on your content server.
  activePivotServers: {
    "Ranch-5.10": {
      url: "http://localhost:9090",
      version: "5.10.x",
    }
  },
};
