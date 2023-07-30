"use server";

import { google } from "googleapis";

async function fetchGoogleCalendar(accessToken, month) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth });

  const year = new Date().getFullYear(); // Get the current year
  const firstDay = new Date(year, month - 1, 1); // Create a date for the first day of the specified month
  const lastDay = new Date(year, month, 0); // Create a date for the last day of the specified month

  try {
    const response = await calendar.events.list({
      calendarId: "primary", // Use 'primary' for the user's primary calendar
      timeMin: firstDay.toISOString(),
      timeMax: lastDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;

    // Now, 'events' contains all the events in the specified month.
    // You can process the events here or return them to the caller.

    return events;
  } catch (error) {
    // Handle any errors that may occur during the API request.
    console.error("Error fetching events:", error);
    throw error;
  }
}

export default fetchGoogleCalendar;
