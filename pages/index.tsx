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

  //타이머
  const [timeRemaining, setTimeRemaining] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      // 타이머 콜백 함수
      if (timeRemaining > 0) {
        // 시간이 남아있을 때
        setTimeRemaining(timeRemaining - 1); // 1초씩 감소
      } else {
        clearInterval(timer); // 시간이 다 되면 타이머 종료
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
      localStorage.setItem("timeRemaining", timeRemaining.toString());
    };
  }, [timeRemaining]);

  const progressRatio = (timeRemaining / 300) * 100;

  // 초를 분과 초로 변환
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // 시간을 00:00 형식으로 포맷
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <>
      <Center style={{ marginTop: "20px" }}>
        <Flex direction={"column"} style={{ width: "340px" }}>
          <Flex
            direction={"row"}
            align={"center"}
            justify={"space-between"}
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
                    {formattedTime}
                  </Text>
                </Center>
              }
              sections={[{ value: progressRatio, color: "#F21D76" }]}
              size={60}
              thickness={5}
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
        </Flex>
      </Center>
    </>
  );
}
