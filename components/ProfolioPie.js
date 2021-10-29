import React, { useEffect, useState } from "react";
import axios from "axios";
import { VictoryPie } from "victory-native";
import { View, Text } from "react-native";

export default function ProfolioPie({ data }) {
  const [prices, setPrices] = useState([]);
  const [total, setTotal] = useState(0);
  const [shareValues, setShareValues] = useState([{}]);
  const [isLoading,setIsLoading] = useState(false)

  const getPrices = async () => {

    let links = [];
    data.map((stock) => {
      links.push(`https://www.asx.com.au/asx/1/share/${stock.code}`);
    });
    let promises = [];
    links.map((link) => {
      promises.push(axios.get(link));
    });

    setIsLoading(true)
    const result = await Promise.all(promises);
    setIsLoading(false)    
      let currents = [];

      result.map((res) => {
        currents.push({ x: res.data.code, y: res.data.last_price });
      });

      setPrices(currents);
      let currentTotal = 0;
      let valuess = [];
      prices.map((x) => {
        currentTotal += x.y * data.find((stock) => stock.code === x.x).units;
        valuess.push({
          x: x.x,
          y: parseFloat(
            (x.y * data.find((stock) => stock.code === x.x).units).toFixed(3)
          ),
        });
      });
    setTotal(currentTotal);
    setShareValues(valuess);
    
  };

  useEffect(() => {
    getPrices();
  }, [shareValues]);


  return (
    <>
          <VictoryPie
            data={shareValues}
            colorScale={"qualitative"}
            width={400}
            height={300}
            labels={({ datum }) =>
              `${datum.x}:${((datum.y / total) * 100).toFixed(2)} %`
            }
          />
    </>
  );
}
