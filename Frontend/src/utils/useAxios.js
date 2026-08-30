import { useEffect, useState } from "react";
import { api } from "../api";

const useFetch = (url, method = "get") => {
  const [response, setResponse] = useState({
    msg: "",
    loading: true,
    data: null,
    reload
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setResponse(prev => ({
          ...prev,
          msg: "",
          loading: true,
        }));

        const res = await api[method](url);

        console.log("res in useAxios", res);


        if (
          true
        ) {
          setResponse({
            msg: "",
            loading: false,
            data: res.data.data,
          });
        } else {
          setResponse({
            msg: "Something went wrong, failed to serve request",
            loading: false,
            data: null,
          });
        }
      } catch (error) {
        setResponse({
          msg:
            error.response?.data?.message ||
            "Something went wrong, failed to fetch data",
          loading: false,
          data: null,
        });
      }
    };
    
    setResponse(prev => ({...prev, reload:fetchData}))
    fetchData();

    
  }, [url, method]);
  
  return response
};

export { useFetch };