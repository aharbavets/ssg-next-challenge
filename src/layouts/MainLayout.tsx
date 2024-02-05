import { FunctionComponent, PropsWithChildren, useState } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Button } from "@/components/Button";
import { Person } from "@/utils/common/person";
import { UserView } from "@/components/UserView";
import { useQuery } from "react-query";
import { User } from "@/entities/User";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  const [selectedPerson, setSelectedPerson] = useState<string | undefined>();

  let getPerson = async ({ queryKey }: any): Promise<User | undefined> => {
    const [person] = queryKey;

    if (!person) {
      return undefined;
    }

    const response = await fetch(
      `/api/person?person=${encodeURIComponent(person ?? "")}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    if (response.status !== 200) {
      const text = await response.text();
      throw Error(text);
    }

    return response.json();
  };

  const { isLoading, isError, error, data } = useQuery(
    [selectedPerson],
    getPerson,
  );

  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col justify-center items-center",
      )}
    >
      <div className={classNames("flex flex-col h-screen w-screen")}>
        <div className={classNames("flex gap-2 justify-center")}>
          {Object.values(Person).map((person) => (
            <Button
              key={person}
              className={classNames(
                selectedPerson === person ? "bg-sky-300" : "",
              )}
              onClick={() => setSelectedPerson(person)}
            >
              {person}
            </Button>
          ))}
          <button />
        </div>

        {isLoading && (
          <div className={classNames("text-center text-xl mt-9")}>
            Loading...
          </div>
        )}

        {isError && (
          <div className={classNames("text-center text-xl mt-9")}>
            {error.message}
          </div>
        )}

        {!isLoading && !error && (
          <UserView
            isLoading={isLoading}
            error={error}
            user={data}
            className={classNames("flex-1 gap-2")}
          />
        )}
      </div>
    </main>
  );
};
