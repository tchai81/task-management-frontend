import { NextRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleBack = (router: AppRouterInstance) => {
  if (typeof window !== "undefined" && window.history.length > 2) {
    router.back();
  } else {
    router.push("/"); // Fallback to the home page or another default page
  }
};

export default handleBack;
