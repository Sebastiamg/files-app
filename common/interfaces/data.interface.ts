export interface Activity {
  id: string;
  date: string;
  details: string;
  quantity: string;
  start_hour: string;
  pause?: string;
  restart?: string;
  end_hour: string;
}

export type Day = Record<string, Activity[]>;

export interface Data {
  name: string;
  activities: Day;
}

export const testObject: Data = {
  name: "Maria Jarrin",
  activities: {
    "20-12-2024": [
      {
        id: "1",
        date: "22",
        details: "22",
        quantity: "0",
        start_hour: "22",
        pause: "22",
        restart: "22",
        end_hour: "12223",
      },
      {
        id: "2",
        date: "22",
        details: "22",
        quantity: "0",
        start_hour: "22",
        pause: "22",
        restart: "22",
        end_hour: "12223",
      },
    ],
    "21-12-2024": [
      {
        id: "1",
        date: "22",
        details: "22",
        quantity: "0",
        start_hour: "22",
        pause: "22",
        restart: "22",
        end_hour: "12223",
      },
      {
        id: "2",
        date: "22",
        details: "22",
        quantity: "0",
        start_hour: "22",
        pause: "22",
        restart: "22",
        end_hour: "12223",
      },
    ],
  },
};
