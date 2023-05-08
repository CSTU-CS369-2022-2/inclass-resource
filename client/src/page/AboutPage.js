// file: /page/AboutPage.js
import { Link } from "react-router-dom";

const About = () => (
    <>
      <h1>About Us</h1>
      <div>
        It is a react-router-dom lesson. There are plenty of things that we can
        learn.
      </div>
      <div>
        More details could be seen <Link to="https://reactrouter.com">here</Link>.
      </div>
    </>
  );
export default About;  