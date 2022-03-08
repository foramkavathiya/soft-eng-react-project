import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';

test('tuit list renders async', async () => {
    const users = await findAllTuits();
    render(
        <HashRouter>
        <UserList users={users}/>
        <TuitList tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/My heart goes out to the Malaysian people. This is such a tragedy. Words can't express how sad it is. I wish we could just have peace. #MH17/i);
    expect(linkElement).toBeInTheDocument();
  })