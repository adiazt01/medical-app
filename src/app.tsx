import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./modules/auth/context/auth-context";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuth } from "./modules/auth/hooks/useAuth";

export const queryClient = new QueryClient()


export function App() {
    const auth = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
            
            <RouterProvider router={router} context={{
                auth
            }} />
            <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-right' />
        </QueryClientProvider>
    )
}