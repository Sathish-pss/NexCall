import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

/**
 *
 * @param id Custom hook to get call details by ID
 */
export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  // Get access to the client by useStreamVideo client hook from sdk
  const client = useStreamVideoClient();

  // Use Effect to Load the Call
  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });
      if (calls.length > 0) setCall(calls[0]);
      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]);

  // Return the states Call and isCallLoading
  return { call, isCallLoading };
};
