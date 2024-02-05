import { User } from "@/entities/User";
import React, { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonProps = {
  isLoading: boolean;
  user?: User;
  error: any;
  className?: string | undefined;
};

export const UserView: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  isLoading,
  error,
  className,
  user,
}) => {
  if (!user) {
    return (
      <div className={classNames("text-center")}>
        Please click a button above to view some person
      </div>
    );
  }

  return (
    <div
      style={{
        background: `url('${user.backgroundImageUrl}')`,
        backgroundSize: "cover",
      }}
      className={classNames(
        "flex flex-col align-middle justify-center justify-items-center",
        className,
      )}
    >
      <div
        className={classNames(
          "flex flex-col align-middle justify-center justify-items-center m-auto p-5",
        )}
      >
        <a
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={user.profilePictureUrl}
            alt={user.name}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h1 className={"text-3xl text-center"}>{user.name}</h1>
            <h2 className={"text-2xl text-center"}>{user.title}</h2>

            <div className={classNames("text-center")}>
              Followers: {user.metrics.followers} Following:{" "}
              {user.metrics.following}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
