import EventEmitter from "eventemitter3";

// singleton event manager
const EventService = (() => {
  const eventEmitter = new EventEmitter();

  return {
    /**
     * Triggers an event with optional data.
     * @param eventName - Name of the event
     * @param data - Data to send with the event (optional)
     */
    emit: (eventName: string, data?: any) => {
      eventEmitter.emit(eventName, data);
    },

    /**
     * Subscribes to an event and executes a callback when the event occurs.
     * @param eventName - Name of the event
     * @param callback - Function to execute when the event occurs
     */
    on: (eventName: string, callback: (...args: any[]) => void) => {
      eventEmitter.on(eventName, callback);
    },

    /**
     * Unsubscribes from an event.
     * @param eventName - Name of the event
     * @param callback - Function reference to remove
     */
    off: (eventName: string, callback: (...args: any[]) => void) => {
      eventEmitter.off(eventName, callback);
    },
  };
})();

export default EventService;
