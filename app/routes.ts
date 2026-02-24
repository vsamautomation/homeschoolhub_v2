import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/analytics", "routes/api.analytics.ts"),
] satisfies RouteConfig;
