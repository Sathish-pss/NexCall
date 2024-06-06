import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCalls = () => {
  // Destructuring the user details from the clerk
  const { user } = useUser();
  // Getting the client details from the use stream
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  // State to set the Calls data
  const [isLoading, setIsLoading] = useState(false);

/**
 * UseEffect hook to fetch the load calls
 */
  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  // Getting the current date
  const now = new Date();

  // Variable to fetch the ended calls
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  // Variable to fetch the upcoming calls
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  // Returning the Details
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
