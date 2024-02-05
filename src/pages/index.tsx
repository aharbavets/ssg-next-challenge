import { MainLayout } from "@/layouts/MainLayout";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout />
    </QueryClientProvider>
  );
};

export default Home;
