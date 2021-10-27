import React,{useState,useEffect} from 'react';
import { View } from 'react-native';
import { DataTable } from "react-native-paper";

import TableRow from '../components/TableRow';
const optionsPerPage = [2, 3, 4];
const existingData = [
    {
        code: 'A2M',
        avgPrice: 11.62,
        units:353
    },
    {
        code: 'MP1',
        avgPrice: 12.6091,
        units: 353,
    },
    {
        code: 'QAN',
        avgPrice: 2.6275,
        units:1827
    },
    {
        code: 'RIO',
        avgPrice: 98.19,
        units:49
    },
    {
        code: 'VAS',
        avgPrice: 68.9193,
        units:363
    }
]
export default function Portfolio() {
      const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    

     

   useEffect(() => {
          setPage(0);
        //shareData();
      }, [itemsPerPage]);
    
    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Code</DataTable.Title>
                    <DataTable.Title numeric>Avg Price</DataTable.Title>
                    {/* Earning = (current price - avg price) / avg price */}
            <DataTable.Title numeric>Earning</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
            <DataTable.Title numeric>Change</DataTable.Title>
          </DataTable.Header>

                {existingData.map(stock => {
                    return (
                      <TableRow stock={stock} key={stock.code}></TableRow>
                    );
            })}

          <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={"Rows per page"}
          />
        </DataTable>
      </View>
    );
}
