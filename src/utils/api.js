const api = {
  hostname:
    "https://appworks-school.github.io/Front-End-Class-DiveIntoTopic/api/timezones",
  getLocalTimezone() {
    return fetch(`${this.hostname}/current`).then((response) =>
      response.json()
    );
  },
  getTimezonesList() {
    return fetch(`${this.hostname}/list`).then((response) => response.json());
  },
};

export default api;
