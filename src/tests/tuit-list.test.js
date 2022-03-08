import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const MOCKED_USERS = [
  {username: "alice", _id: "123"},
  {username: "bob", _id: "345"},
  {username: "charlie", _id: "567"}
];

const MOCKED_TUITS = [
  {tuit:"alice's tuit", postedBy: "71534671", _id: "123"},
  {tuit:"bob's tuit", postedBy: "3456724", _id: "345"},
  {tuit:"charlie's tuit", postedBy: "1347638", _id: "567"},
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>
);
  const linkElement1 = screen.getByText(/alice's tuit/i);
  const linkElement2 = screen.getByText(/bob's tuit/i);
  const linkElement3 = screen.getByText(/charlie's tuit/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});



test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);

  const tuit = screen.getByText(/bob's tuit/i);
  expect(tuit).toBeInTheDocument();
});
