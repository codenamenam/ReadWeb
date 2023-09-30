import {
  Button,
  Center,
  Flex,
  Text,
  Title,
  Space,
  RingProgress,
} from "@mantine/core";

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
      <Center style={{ marginTop: "20px" }}>
        <Flex direction={"column"} style={{ width: "340px" }}>
          <Flex
            direction={"row"}
            align={"center"}
            style={{ marginBottom: "20px" }}
          >
            <Flex direction={"column"}>
              <Text
                style={{
                  color: "grey",
                  fontWeight: "500",
                  fontSize: "12px",
                  margin: "5px 0 5px 0",
                }}
              >
                {month}월 {day}일
              </Text>
              <Flex>
                <Title size={20}>오늘의&nbsp;</Title>
                <Title size={20} style={{ color: "#F21D76" }}>
                  디펜스
                </Title>
              </Flex>
            </Flex>
            <Space w="150px" />
            <RingProgress
              label={
                <Center>
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    4:53
                  </Text>
                </Center>
              }
              sections={[{ value: 40, color: "#F21D76" }]}
              size={60}
              thickness={6}
              style={{ margin: 0, padding: 0 }}
            ></RingProgress>
          </Flex>
          <div
            style={{
              backgroundColor: " rgba(250, 251, 252, 1)",
              padding: "20px",
            }}
          >
            <Text style={{ fontSize: "16px" }}>{readData}</Text>
          </div>
          <Button>아아</Button>
        </Flex>
      </Center>
    </>
  );
}
