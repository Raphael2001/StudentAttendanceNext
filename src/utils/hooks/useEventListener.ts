import { useEffect } from "react";
import EventService from "services/EventService";

/**
 * Custom hook to listen for a specific event.
 * @param eventName - The name of the event to listen for.
 * @param callback - Function to execute when the event is triggered.
 */
const useEventListener = (
  eventName: string,
  callback: (...args: any[]) => void,
) => {
  useEffect(() => {
    EventService.on(eventName, callback);

    return () => {
      EventService.off(eventName, callback); // Cleanup when the component unmounts
    };
  }, [eventName, callback]);
};

export default useEventListener;
