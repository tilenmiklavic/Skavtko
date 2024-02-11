export default function formatTime(timeString: string) {
    // Split the time string into hours, minutes, and seconds

    if (timeString) {
        let [hours, minutes, seconds] = timeString.split(':');

        // Pad minutes and seconds with leading zeros if necessary
        minutes = minutes.padStart(2, '0');
        seconds = seconds.padStart(2, '0');

        // Return the formatted time string
        return `${hours}:${minutes}:${seconds}`;
    }

    return "";

}