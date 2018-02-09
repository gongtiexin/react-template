import ReactLoadable from "react-loadable";
import Loading from "./Loading";

const Loadable = opts =>
  ReactLoadable({
    loading: Loading,
    delay: 300,
    timeout: 10000,
    ...opts,
  });

export default Loadable;
