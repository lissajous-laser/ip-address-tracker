import { googleDomain } from "../constants"

export const apiCall = jest.fn(() => {
  return new Promise((err, res) => {
      res(googleDomain);
  });
})