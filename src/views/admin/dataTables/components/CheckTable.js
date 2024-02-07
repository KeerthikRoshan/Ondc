// CheckTable.js
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import Menu from "components/menu/MainMenu";

export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const [isCheckedArray, setIsCheckedArray] = useState(
    Array(tableData.length).fill(false)
  );

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleCheckboxChange = (index) => {
    const updatedIsCheckedArray = [...isCheckedArray];
    updatedIsCheckedArray[index] = !updatedIsCheckedArray[index];
    setIsCheckedArray(updatedIsCheckedArray);
  };

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
        >
          Waiting for Approval
        </Text>
        {isCheckedArray.some((isChecked) => isChecked) && (
          <Button
            style={{}}
            colorScheme='green'
            ml='2'
            onClick={() => alert("Approved!")}
          >
            Approve
          </Button>
        )}
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => {
                  let data = "";
                  if (cell.column.Header === "Company Name") {
                    const checkboxIndex = rowIndex;
                    data = (
                      <Flex align='center'>
                        <Checkbox
                          defaultChecked={isCheckedArray[checkboxIndex]}
                          colorScheme='brandScheme'
                          me='10px'
                          onChange={() => handleCheckboxChange(checkboxIndex)}
                        />
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value[0]}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Type") {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "View") {
                    // Render the View column as a Link component
                    data = (
                      <Link to={cell.value.link} color="blue.500">
                        {cell.value.label}
                      </Link>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={cellIndex}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}