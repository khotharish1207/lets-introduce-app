import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Preview from "../preview/Preview";
import { getSite } from "../redux/reducer/site.reducer";

const Site = () => {
  const dispatch = useDispatch();
  const { site } = useParams();

  useEffect(() => {
    dispatch(getSite(site));
  }, []);

  return <Preview site />;
};

export default Site;
