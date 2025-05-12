import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./providers/auth-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GetUser } from "./components/user/get-user";
import { LoaderIcon } from "lucide-react";

const router = createRouter({
  routeTree,
  context: { authentication: null! },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authentication = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <GetUser />

      {authentication.isLoading && authentication.isAuth ? (
        <div className="flex h-[100dvh] w-full justify-center items-center">
          <LoaderIcon size={32} className="animate-spin" />
        </div>
      ) : (
        <RouterProvider router={router} context={{ authentication }} />
      )}
    </QueryClientProvider>
  );
}

export default App;
