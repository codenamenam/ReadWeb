import { Button, Center, Flex, Text, Title, Card, Group } from "@mantine/core";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  //지문 가져오기
  const [readData, setReadData] = useState("");

  const handleReadData = async () => {
    const result = await axios.get("../api/getReadData");
    if (result.status === 200) {
      setReadData(result.data.body);
    }
  };

  useEffect(() => {
    handleReadData();
  }, []);

  //날짜 가져오기
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <>
      <Center>
        <Flex direction={"column"} style={{ width: "340px" }}>
          <Flex direction={"row"}>
            <Flex direction={"column"}>
              <Text>
                {month}월 {day}일
              </Text>
              <Title>오늘의 디펜스</Title>
            </Flex>
            <Text>4:53</Text>
          </Flex>
          <div style={{ backgroundColor: "grey" }}>
            <Text>{readData}</Text>
          </div>
          <Button>아아</Button>
        </Flex>
      </Center>
    </>
  );
}
